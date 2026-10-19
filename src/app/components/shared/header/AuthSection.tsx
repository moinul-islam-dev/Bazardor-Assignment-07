import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AuthenticationButtons from "./AuthenticationButtons";
import ProfileDropDown from "./ProfileDropDown";

const AuthSection = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user = session?.user;
  const name = session?.user?.name;

  return (
    <div>
      {user ? <ProfileDropDown name={name} /> : <AuthenticationButtons />}
    </div>
  );
};

export default AuthSection;
