import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import Image from "next/image";
import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { name } = await getCabin(resolvedParams.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const cabin = await getCabin(resolvedParams.cabinId);

  return (
    <div className="mx-auto mt-2 max-w-6xl space-y-14">
      <Cabin cabin={cabin} />

      <section>
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">
          Make it yours
        </p>
        <h2 className="mb-10 text-center text-3xl font-medium text-primary-50 sm:text-4xl">
          Choose your dates for Cabin {cabin.name}.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </section>
    </div>
  );
}
