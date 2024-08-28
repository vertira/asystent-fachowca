import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import Spinner from "@/components/ui/spinner";
import { getWorksByUserId } from "@/lib/server-actions";
import { Suspense } from "react";
import { RegisterFormProvider } from "@/context/RegisterFormContext";
import { SideBarMotion } from "@/components/sidenavbar/sidebar-content";
const HomeLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const authenticatedUser = await auth();
	const works = await getWorksByUserId();

	return (
		<RegisterFormProvider>
			{authenticatedUser ? (
				<SideBarMotion authenticatedUser={authenticatedUser} works={works}>
					<Suspense fallback={<Spinner />}>{children}</Suspense>
				</SideBarMotion>
			) : (
				<Navbar authenticatedUser={authenticatedUser} products={works}>
					<Suspense fallback={<Spinner />}>{children}</Suspense>
				</Navbar>
			)}
		</RegisterFormProvider>
	);
};

export default HomeLayout;
