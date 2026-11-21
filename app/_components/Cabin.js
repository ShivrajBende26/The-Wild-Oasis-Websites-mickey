import Image from "next/image";
import Link from "next/link";
import TextExpander from "@/app/_components/TextExpander";
import {
  ArrowLeftIcon,
  EyeSlashIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function Cabin({ cabin }) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div>
      <Link
        href="/cabins"
        className="mb-6 inline-flex items-center gap-2 text-sm text-primary-300 transition-colors hover:text-accent-300"
      >
        <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
        Back to the cabin collection
      </Link>

      <article className="grid overflow-hidden rounded-3xl border border-primary-800 bg-primary-900/35 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative aspect-[4/3] bg-primary-900 lg:aspect-auto lg:min-h-[32rem]">
          {image ? (
            <Image
              src={image}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              loading="eager"
              className="object-cover"
              alt={`Cabin ${name} in the Dolomites`}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
          )}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">
            The Wild Oasis · Cabin {name}
          </p>
          <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-primary-50 sm:text-5xl">
            Your own corner
            <span className="block font-light italic text-accent-300">
              of the mountains.
            </span>
          </h1>
          <div className="mt-6 text-base leading-7 text-primary-200">
            <TextExpander>{description}</TextExpander>
          </div>

          <ul className="mt-8 space-y-4 border-t border-primary-800 pt-7">
            <li className="flex items-center gap-3 text-sm text-primary-200">
              <UsersIcon
                aria-hidden="true"
                className="h-5 w-5 text-accent-400"
              />
              Room for up to {maxCapacity} guests
            </li>
            <li className="flex items-center gap-3 text-sm text-primary-200">
              <MapPinIcon
                aria-hidden="true"
                className="h-5 w-5 text-accent-400"
              />
              Set in the Italian Dolomites
            </li>
            <li className="flex items-center gap-3 text-sm text-primary-200">
              <EyeSlashIcon
                aria-hidden="true"
                className="h-5 w-5 text-accent-400"
              />
              A private stay, at your own pace
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}

export default Cabin;
