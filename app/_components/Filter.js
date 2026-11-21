"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const requestedFilter = searchParams.get("capacity") ?? "all";
  const activeFilter = ["all", "small", "medium", "large"].includes(
    requestedFilter
  )
    ? requestedFilter
    : "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      role="group"
      aria-label="Filter cabins by guest capacity"
      className="flex max-w-full overflow-x-auto rounded-full border border-primary-700 bg-primary-900/50 p-1"
    >
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      type="button"
      aria-pressed={filter === activeFilter}
      className={`whitespace-nowrap rounded-full px-3 py-2 text-xs transition-colors sm:px-4 sm:text-sm ${
        filter === activeFilter
          ? "bg-accent-500 font-semibold text-primary-950"
          : "text-primary-200 hover:bg-primary-800 hover:text-primary-50"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
