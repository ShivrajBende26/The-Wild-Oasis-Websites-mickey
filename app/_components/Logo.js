import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link
      href="/"
      className="z-10 flex min-w-0 items-center gap-3"
    >
      <Image
        src={logo}
        height={48}
        quality={100}
        width={48}
        alt="The Wild Oasis logo"
        className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
      />
      <span className="whitespace-nowrap text-base font-semibold text-primary-100 sm:text-lg">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
