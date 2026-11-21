import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  MoonIcon,
  SparklesIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import bg from "@/public/bg.png";

const moments = [
  {
    number: "01",
    title: "Mornings without a rush",
    description:
      "Let the first light find you slowly, with the mountains just beyond your window.",
    icon: SunIcon,
  },
  {
    number: "02",
    title: "A little more outside",
    description:
      "Follow the forest paths, breathe in the alpine air, and let the day unfold.",
    icon: SparklesIcon,
  },
  {
    number: "03",
    title: "Evenings that linger",
    description:
      "Come back when the peaks turn gold and make room for one more good conversation.",
    icon: MoonIcon,
  },
];

export default function Page() {
  return (
    <>
      <section className="relative left-1/2 -mt-12 w-screen -translate-x-1/2 overflow-hidden bg-primary-950">
        <Image
          src={bg}
          placeholder="blur"
          quality={80}
          preload
          className="block h-auto w-full"
          alt="A quiet cabin beside a mountain lake at dawn"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/85 via-primary-950/45 to-primary-950/10" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-20">
          <div className="max-w-3xl">
            <p className="mb-5 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent-200 sm:flex sm:text-sm">
              <span className="h-px w-8 bg-accent-300" />
              The Dolomites, at your own pace
            </p>
            <h1 className="max-w-2xl text-3xl font-medium leading-[1.05] tracking-tight text-primary-50 sm:text-6xl lg:text-7xl">
              Let the mountains
              <span className="block font-light italic text-accent-200">
                set your pace.
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-xs leading-5 text-primary-100 sm:mt-7 sm:text-lg sm:leading-8">
              Trade the packed itinerary for a cabin, a little fresh air, and
              the kind of quiet that stays with you long after you leave.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-9">
              <Link
                href="/cabins"
                className="inline-flex items-center gap-3 rounded-full bg-accent-400 px-5 py-3 text-sm font-semibold text-primary-950 transition-all hover:-translate-y-0.5 hover:bg-accent-300 sm:px-7 sm:py-4"
              >
                Find your cabin
                <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="#retreat"
                className="text-sm font-medium text-primary-50 underline decoration-primary-100/50 underline-offset-4 transition-colors hover:text-accent-200"
              >
                Discover the feeling
              </Link>
            </div>
          </div>
        </div>
        <a
          href="#retreat"
          aria-label="Scroll to discover The Wild Oasis"
          className="absolute bottom-6 right-6 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary-100/80 transition-colors hover:text-accent-200 sm:flex lg:bottom-9 lg:right-10"
        >
          Scroll to explore
          <ArrowDownIcon aria-hidden="true" className="h-4 w-4" />
        </a>
      </section>

      <section
        id="retreat"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-accent-400">
              A stay with space to breathe
            </p>
            <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight text-primary-50 sm:text-5xl">
              Not another stop.
              <span className="block font-light italic text-accent-300">
                A place to arrive.
              </span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-primary-200 sm:text-lg sm:leading-8">
              The Wild Oasis is a small invitation to do less, notice more, and
              feel at home in the Dolomites. Choose a cabin that suits your
              gathering, then let the landscape take it from there.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
            >
              Read our story
              <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div
          id="experiences"
          className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-3"
        >
          {moments.map(({ number, title, description, icon: Icon }) => (
            <article
              key={number}
              className="rounded-2xl border border-primary-800 bg-primary-900/35 p-6 transition-colors hover:border-primary-600 sm:p-8"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm tracking-[0.18em] text-accent-400">
                  {number}
                </span>
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-primary-300"
                />
              </div>
              <h3 className="text-xl font-medium text-primary-50">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-primary-300">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-accent-500 px-6 py-8 text-primary-950 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-9">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-800">
              Your mountain days start here
            </p>
            <h2 className="mt-2 text-2xl font-medium sm:text-3xl">
              Find a cabin that feels like yours.
            </h2>
          </div>
          <Link
            href="/cabins"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-primary-900/30 px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary-950 hover:text-primary-50 sm:self-auto"
          >
            Explore the cabins
            <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
