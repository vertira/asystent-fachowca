import { auth } from "@/auth";
import { getUserPermissions } from "@/lib/server-actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Edycja prac | Asystent Fachowca",
  description: "Asystent Fachowca",
  icons: {
    icon: "/icon.ico",
  },
};
const MyWorksLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();
  const userPermissions = await getUserPermissions();
  if (!authenticatedUser) {
    redirect("/");
  }
  if (authenticatedUser.user.role === "STAFF") {
    if (!userPermissions.permissions.editWork) {
      redirect("/");
    }
  }
  return <>{children}</>;
};

export default MyWorksLayout;
