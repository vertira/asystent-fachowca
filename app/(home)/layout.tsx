import { auth } from "@/auth";
import { Navbar } from "@/components/navbar/navbar";
import Spinner from "@/components/ui/spinner";
import { getWorksByUserId } from "@/lib/server-actions";
import { Suspense } from "react";
import { LoginFormProvider } from "@/context/LoginFormContext";
import { SideBarMotion } from "@/components/sidenavbar/sidebar-content";
const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();
  const works = await getWorksByUserId();

  return (
    <LoginFormProvider>
      {authenticatedUser ? (
        <SideBarMotion authenticatedUser={authenticatedUser} works={works}>
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </SideBarMotion>
      ) : (
        <Navbar authenticatedUser={authenticatedUser} products={works}>
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </Navbar>
      )}
    </LoginFormProvider>
  );
};

export default HomeLayout;
