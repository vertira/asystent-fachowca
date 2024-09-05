import { auth } from "@/auth";
import Spinner from "@/components/ui/spinner";
import {
  getUserPermissions,
  getWorksByUserId,
  isUserPremium,
} from "@/lib/server-actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const NewProductLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();
  const works = await getWorksByUserId();
  const isPremium = await isUserPremium();
  const userPermissions = await getUserPermissions();
  if (!isPremium && works!.length >= 2) {
    redirect("/");
  }
  if (authenticatedUser?.user.role === "STAFF") {
    if (!userPermissions.permissions.createWork) {
      redirect("/");
    }
  }
  if (!authenticatedUser) {
    redirect("/");
  }
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default NewProductLayout;
