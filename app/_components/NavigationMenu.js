"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  Bars3Icon,
  EnvelopeIcon,
  HomeIcon,
  MapPinIcon,
  SparklesIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const links = [
  {
    label: "Welcome",
    detail: "A first look around",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Cabin collection",
    detail: "Find your place in the mountains",
    href: "/cabins",
    icon: MapPinIcon,
  },
  {
    label: "The experience",
    detail: "Make time for the good things",
    href: "/#experiences",
    icon: SparklesIcon,
  },
  {
    label: "Contact us",
    detail: "We would love to hear from you",
    href: "/contact",
    icon: EnvelopeIcon,
  },
  {
    label: "Our story",
    detail: "Get to know The Wild Oasis",
    href: "/about",
    icon: ArrowUpRightIcon,
  },
];

export default function NavigationMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const accountHref = user ? "/account" : "/login";

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key === "Tab") {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeDrawer() {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
        <Link
          href="/cabins"
          className="text-sm text-primary-100 transition-colors hover:text-accent-300"
        >
          Cabins
        </Link>
        <Link
          href="/#experiences"
          className="text-sm text-primary-100 transition-colors hover:text-accent-300"
        >
          Experiences
        </Link>
        <Link
          href="/about"
          className="text-sm text-primary-100 transition-colors hover:text-accent-300"
        >
          Our story
        </Link>
        <Link
          href="/contact"
          className="text-sm text-primary-100 transition-colors hover:text-accent-300"
        >
          Contact
        </Link>
      </nav>

      <Link
        href={accountHref}
        className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-accent-400/50 bg-accent-500 px-2.5 py-2 text-xs font-semibold text-primary-950 transition-colors hover:bg-accent-400 sm:px-4 sm:text-sm"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <UserCircleIcon aria-hidden="true" className="h-5 w-5" />
        )}
        <span>{user ? "Guest area" : "Sign in"}</span>
      </Link>

      <button
        ref={menuButtonRef}
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="site-navigation-drawer"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-700 text-primary-100 transition-colors hover:border-accent-400 hover:text-accent-300"
      >
        {isOpen ? (
          <XMarkIcon aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Bars3Icon aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isOpen
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          tabIndex={isOpen ? 0 : -1}
          aria-label="Close navigation menu"
          onClick={closeDrawer}
          className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-[2px]"
        />

        <aside
          ref={drawerRef}
          id="site-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          inert={!isOpen}
          className={`absolute inset-y-0 left-0 flex w-[min(90vw,26rem)] flex-col border-r border-primary-800 bg-primary-950 px-6 py-6 shadow-2xl shadow-black/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-primary-800 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-400">
                The Wild Oasis
              </p>
              <p className="mt-2 text-sm text-primary-300">
                Take the scenic route.
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeDrawer}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-700 text-primary-100 transition-colors hover:border-accent-400 hover:text-accent-300"
            >
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Site navigation" className="mt-8">
            <ul className="space-y-2">
              {links.map(({ label, detail, href, icon: Icon }, index) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={closeDrawer}
                    style={{
                      transitionDelay: isOpen ? `${index * 65}ms` : "0ms",
                    }}
                    className={`group flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-primary-900 ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0"
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-900 text-accent-300 transition-colors group-hover:bg-accent-500 group-hover:text-primary-950">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-medium text-primary-50">
                        {label}
                      </span>
                      <span className="mt-1 block text-sm text-primary-300">
                        {detail}
                      </span>
                    </span>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-primary-500 transition-transform group-hover:translate-x-1 group-hover:text-accent-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-primary-800 pt-6">
            <Link
              href={accountHref}
              onClick={closeDrawer}
              className="flex items-center gap-3 rounded-xl px-2 py-3 text-primary-100 transition-colors hover:text-accent-300"
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <UserCircleIcon aria-hidden="true" className="h-8 w-8" />
              )}
              <span className="flex-1">
                <span className="block font-medium">
                  {user ? "Guest area" : "Sign in"}
                </span>
                <span className="text-sm text-primary-300">
                  {user ? "Your stays and profile" : "Sign in to manage your stay"}
                </span>
              </span>
              <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" />
            </Link>
            <p className="mt-4 flex items-center gap-2 text-xs text-primary-400">
              <MapPinIcon aria-hidden="true" className="h-4 w-4" />
              A quieter corner of the Dolomites
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
