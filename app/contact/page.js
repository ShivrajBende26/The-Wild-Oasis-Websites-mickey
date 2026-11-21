import { EnvelopeIcon } from "@heroicons/react/24/outline";
import ContactForm from "@/app/_components/ContactForm";
import { CONTACT_EMAIL } from "@/app/_lib/contact-config";

export const metadata = {
  title: "Contact us",
  description:
    "Get in touch with The Wild Oasis team about your stay in the Dolomites.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl py-2">
      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
        <div className="space-y-7">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">
              We are here to help
            </p>
            <h1 className="text-4xl font-medium leading-tight tracking-tight text-primary-50 sm:text-5xl">
              Let&apos;s talk about
              <span className="block font-light italic text-accent-300">
                your next stay.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-primary-200">
              Questions about a cabin, your plans, or the area? Send us a
              message and we will get back to you.
            </p>
          </div>

          <div className="rounded-2xl border border-primary-800 bg-primary-900/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-400">
              Email us directly
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-flex items-center gap-3 text-primary-50 transition-colors hover:text-accent-300"
            >
              <EnvelopeIcon
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-300"
              />
              <span className="break-all">{CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-5 text-2xl font-medium text-primary-50">
            Send us a message
          </h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
