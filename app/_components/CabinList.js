import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinList({ filter }) {
  // noStore();

  const cabins = await getCabins();

  if (!cabins.length)
    return (
      <p className="text-lg text-primary-200">
        Cabin data is temporarily unavailable. Please check the Supabase
        configuration and database table permissions.
      </p>
    );

  const matchesFilter = {
    small: (cabin) => cabin.maxCapacity <= 3,
    medium: (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    large: (cabin) => cabin.maxCapacity >= 8,
  }[filter];
  const displayedCabins = matchesFilter
    ? cabins.filter(matchesFilter)
    : cabins;

  if (!displayedCabins.length)
    return (
      <p className="rounded-2xl border border-primary-800 bg-primary-900/40 p-6 text-primary-200">
        No cabins match that group size. Try another capacity.
      </p>
    );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:gap-8">
      {displayedCabins.map((cabin, index) => (
        <CabinCard
          cabin={cabin}
          eager={index === 0}
          key={cabin.id}
        />
      ))}
    </div>
  );
}

export default CabinList;
