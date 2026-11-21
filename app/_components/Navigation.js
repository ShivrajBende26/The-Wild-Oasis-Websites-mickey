import { auth } from "../_lib/auth";
import NavigationMenu from "./NavigationMenu";

export default async function Navigation() {
  const session = await auth();
  const user = session?.user
    ? {
        name: session.user.name ?? "Guest",
        image: session.user.image ?? null,
      }
    : null;

  return <NavigationMenu user={user} />;
}
