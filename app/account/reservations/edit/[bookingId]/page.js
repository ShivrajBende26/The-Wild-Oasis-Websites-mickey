import { auth } from "@/app/_lib/auth";
import { getBooking } from "@/app/_lib/data-service";
import { updateBooking } from "@/app/_lib/actions";
import SubmitButton from "@/app/_components/SubmitButton";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "Edit reservation",
};

export default async function Page({ params }) {
  const { bookingId: bookingIdParam } = await params;
  const bookingId = Number(bookingIdParam);

  if (!Number.isSafeInteger(bookingId) || bookingId < 1) notFound();

  const session = await auth();
  if (!session?.user?.guestId) redirect("/login");

  const booking = await getBooking(bookingId, session.user.guestId);
  if (!booking) notFound();
  if (!booking.cabins) throw new Error("Cabin details could not be loaded");

  const { name: cabinName, maxCapacity } = booking.cabins;
  if (!Number.isInteger(maxCapacity) || maxCapacity < 1)
    throw new Error("Cabin capacity is invalid");

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-2">
        Edit reservation
      </h2>
      <p className="text-primary-300 mb-7">
        Cabin {cabinName} · {booking.numNights} nights
      </p>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-6 sm:px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" name="bookingId" value={booking.id} />

        <div className="space-y-2">
          <label htmlFor="numGuests">Number of guests</label>
          <select
            id="numGuests"
            name="numGuests"
            defaultValue={booking.numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            {Array.from({ length: maxCapacity }, (_, index) => index + 1).map(
              (numGuests) => (
                <option key={numGuests} value={numGuests}>
                  {numGuests} {numGuests === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">Stay notes</label>
          <textarea
            id="observations"
            name="observations"
            defaultValue={booking.observations ?? ""}
            maxLength={1000}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            rows={4}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Link
            href="/account/reservations"
            className="text-primary-300 underline underline-offset-4"
          >
            Cancel
          </Link>
          <SubmitButton pendingLabel="Saving...">Save changes</SubmitButton>
        </div>
      </form>
    </div>
  );
}
