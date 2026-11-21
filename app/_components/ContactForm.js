"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

const initialState = {
  status: "",
  message: "",
};

const fieldClassName =
  "w-full rounded-md border border-primary-700 bg-primary-200 px-4 py-3 text-primary-950 placeholder:text-primary-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-400";

export default function ContactForm() {
  const [state, formAction] = useActionState(
    sendContactMessage,
    initialState
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 rounded-3xl border border-primary-800 bg-primary-900/70 p-6 shadow-xl shadow-black/10 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-primary-100">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            className={fieldClassName}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-primary-100"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            className={fieldClassName}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-primary-100"
          >
            Phone number <span className="text-primary-400">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-primary-100"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            maxLength={120}
            className={fieldClassName}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-primary-100"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={5000}
          className={fieldClassName}
          required
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.message ? (
        <p
          role={state.status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={
            state.status === "error"
              ? "text-sm text-red-300"
              : "text-sm text-accent-200"
          }
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton pendingLabel="Saving...">Send message</SubmitButton>
      </div>
    </form>
  );
}
