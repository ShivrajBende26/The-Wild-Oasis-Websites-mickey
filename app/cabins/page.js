import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Counter from "../_components/Counter";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3600;
// export const revalidate = 15;

export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const capacity = params?.capacity;
  const filter = ["all", "small", "medium", "large"].includes(capacity)
    ? capacity
    : "all";

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-primary-800 bg-primary-900/45 px-6 py-10 sm:px-10 sm:py-14">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-accent-400/20"
        />
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-accent-400/15"
        />
        <div className="relative max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-accent-400">
            The Wild Oasis · Cabin collection
          </p>
          <h1 className="text-4xl font-medium leading-tight tracking-tight text-primary-50 sm:text-6xl">
            A little closer
            <span className="block font-light italic text-accent-300">
              to the wild.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-primary-200 sm:text-lg sm:leading-8">
            Each cabin is its own quiet corner in the Dolomites. Find the space
            that fits your people, leave the rest of the schedule open, and
            settle into mountain time.
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
            Choose your kind of escape
          </p>
          <h2 className="mt-2 text-2xl font-medium text-primary-50 sm:text-3xl">
            Find your cabin
          </h2>
        </div>
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
