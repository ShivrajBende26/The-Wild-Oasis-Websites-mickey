import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "Our story",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="mx-auto max-w-6xl space-y-16 py-2 sm:space-y-24">
      <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">
            A quieter corner of the Dolomites
          </p>
          <h1 className="text-4xl font-medium leading-tight tracking-tight text-primary-50 sm:text-5xl">
            Somewhere to find
            <span className="block font-light italic text-accent-300">
              your own pace.
            </span>
          </h1>
          <div className="mt-6 space-y-5 text-base leading-7 text-primary-200">
            <p>
              The Wild Oasis is made for the in-between moments: the first deep
              breath after a trail, a slow breakfast, the last light settling
              over the peaks.
            </p>
            <p>
              Our {cabins.length} cabins offer a comfortable place to return
              to, while the forests and mountain air invite you to step outside
              whenever the mood takes you.
            </p>
          </div>
          <Link
            href="/cabins"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-semibold text-primary-950 transition-colors hover:bg-accent-400"
          >
            Explore the cabins
            <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={image1}
            alt="Guests enjoying a quiet evening by a cabin"
            placeholder="blur"
            quality={80}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-3xl md:order-1">
          <Image
            src={image2}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
            alt="A welcoming shared moment at The Wild Oasis"
          />
        </div>
        <div className="order-1 md:order-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">
            Stay in your own rhythm
          </p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-primary-50 sm:text-4xl">
            More space for the moments that matter.
          </h2>
          <p className="mt-6 text-base leading-7 text-primary-200">
            Come as a pair, bring the whole crew, or simply make a little room
            for yourself. Pick the cabin that fits, then let the landscape
            decide what the day becomes.
          </p>
        </div>
      </section>
    </div>
  );
}
