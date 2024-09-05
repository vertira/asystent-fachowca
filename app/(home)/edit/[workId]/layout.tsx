import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Edytowanie | Asystent Fachowca",
  description: "Asystent Fachowca",
  icons: {
    icon: "/icon.ico",
  },
};
const EditWork = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();
  if (!authenticatedUser) {
    redirect("/");
  }

  return <>{children}</>;
};

export default EditWork;
