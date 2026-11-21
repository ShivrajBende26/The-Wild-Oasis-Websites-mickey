import { signInAction } from "../_lib/actions";
import Image from "next/image";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button
        type="submit"
        className="flex min-h-11 items-center justify-center gap-3 rounded border border-[#747775] bg-white px-6 font-sans text-sm font-medium text-[#1f1f1f] shadow-sm transition-colors hover:bg-[#f8f9fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a73e8] active:bg-[#f1f3f4]"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt=""
          height="24"
          width="24"
          className="h-6 w-6 shrink-0"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
