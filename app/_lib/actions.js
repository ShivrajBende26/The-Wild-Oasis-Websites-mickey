"use server";

import { auth, signIn, signOut } from "./auth";
import { getBooking, getBookings } from "./data-service";
import {
  assertSupabaseAdminConfigured,
  supabaseAdmin,
} from "./supabase-admin";
import { CONTACT_EMAIL } from "./contact-config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabaseAdmin
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    cabinId: bookingData.cabinId,
    startDate: bookingData.startDate,
    endDate: bookingData.endDate,
    numNights: bookingData.numNights,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabaseAdmin.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabaseAdmin
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));
  const session = await auth();
  if (!session?.user?.guestId) throw new Error("You must be logged in");
  if (!Number.isSafeInteger(bookingId) || bookingId < 1)
    throw new Error("Invalid reservation");

  const booking = await getBooking(bookingId, session.user.guestId);
  if (!booking)
    throw new Error("You are not allowed to update this booking");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");
  const maxCapacity = booking.cabins?.maxCapacity;

  if (
    !Number.isInteger(numGuests) ||
    numGuests < 1 ||
    !Number.isInteger(maxCapacity) ||
    numGuests > maxCapacity
  ) {
    throw new Error("Guest count must be within the cabin's capacity");
  }
  if (typeof observations !== "string")
    throw new Error("Reservation notes are invalid");

  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ numGuests, observations: observations.slice(0, 1000) })
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function signInAction() {
  assertSupabaseAdminConfigured();
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function sendContactMessage(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const subject = formData.get("subject");
  const message = formData.get("message");
  const website = formData.get("website");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    typeof website !== "string"
  ) {
    return {
      status: "error",
      message: "Please complete the form and try again.",
    };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const trimmedSubject = subject.trim().replace(/[\r\n]+/g, " ");
  const trimmedMessage = message.trim();

  if (
    website ||
    trimmedName.length < 2 ||
    trimmedName.length > 80 ||
    trimmedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) ||
    trimmedPhone.length > 40 ||
    trimmedSubject.length < 3 ||
    trimmedSubject.length > 120 ||
    trimmedMessage.length < 10 ||
    trimmedMessage.length > 5000
  ) {
    return {
      status: "error",
      message: "Please check the form fields and try again.",
    };
  }

  const missingVariables = [
    "GOOGLE_SHEETS_WEB_APP_URL",
    "GOOGLE_SHEETS_CONTACT_SECRET",
  ].filter((variable) => !process.env[variable]);
  if (missingVariables.length) {
    console.error(
      `Contact form is missing environment variables: ${missingVariables.join(", ")}`
    );
    return {
      status: "error",
      message: `Google Sheets storage is not configured yet. Please email us directly at ${CONTACT_EMAIL}.`,
    };
  }

  let response;
  try {
    response = await fetch(process.env.GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.GOOGLE_SHEETS_CONTACT_SECRET,
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        subject: trimmedSubject,
        message: trimmedMessage,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Could not reach Google Sheets contact endpoint", error);
    return {
      status: "error",
      message: `We could not save your message to the contact sheet. Please email us directly at ${CONTACT_EMAIL}.`,
    };
  }

  let result;
  try {
    result = await response.json();
  } catch (error) {
    console.error("Google Sheets contact endpoint returned invalid JSON", {
      status: response.status,
      error,
    });
    return {
      status: "error",
      message: `We could not confirm that your message was saved. Please email us directly at ${CONTACT_EMAIL}.`,
    };
  }

  if (!response.ok || result?.ok !== true) {
    console.error("Google Sheets contact endpoint rejected the message", {
      status: response.status,
      error: result?.error,
    });
    return {
      status: "error",
      message: `We could not save your message to the contact sheet. Please email us directly at ${CONTACT_EMAIL}.`,
    };
  }

  return {
    status: "success",
    message: "Thank you for reaching out. Your message has been saved.",
  };
}
