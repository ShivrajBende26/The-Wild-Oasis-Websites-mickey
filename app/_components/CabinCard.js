import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, UsersIcon } from "@heroicons/react/24/outline";

function CabinCard({ cabin, eager }) {
  const {
    id,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  const price = regularPrice - discount;

  return (
    <article className="group overflow-hidden rounded-3xl border border-primary-800 bg-primary-900/35 transition-all duration-300 hover:-translate-y-1 hover:border-primary-600 hover:shadow-xl hover:shadow-black/10">
      <Link
        href={`/cabins/${id}`}
        aria-label={`View Cabin ${name}`}
        className="relative block aspect-[1.4/1] overflow-hidden bg-primary-900"
      >
        {image ? (
          <Image
            src={image}
            fill
            sizes="(min-width: 1280px) 36rem, (min-width: 768px) 45vw, 100vw"
            loading={eager ? "eager" : "lazy"}
            alt={`Cabin ${name}`}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span
            role="img"
            aria-label={`No image available for Cabin ${name}`}
            className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950"
          />
        )}
      </Link>

      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">
              The Wild Oasis
            </p>
            <h3 className="mt-2 text-2xl font-medium text-primary-50">
              Cabin {name}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-primary-300">
              {description}
            </p>
          </div>
          <p className="shrink-0 text-right">
            {discount > 0 && (
              <span className="block text-xs text-primary-400 line-through">
                ${regularPrice}
              </span>
            )}
            <span className="text-xl font-semibold text-primary-50">
              ${price}
            </span>
            <span className="ml-1 text-xs text-primary-300">/ night</span>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-primary-800 pt-5">
          <p className="flex items-center gap-2 text-sm text-primary-200">
            <UsersIcon aria-hidden="true" className="h-4 w-4 text-accent-400" />
            Up to {maxCapacity} guests
          </p>
          <Link
            href={`/cabins/${id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
          >
            View cabin
            <ArrowRightIcon
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CabinCard;
