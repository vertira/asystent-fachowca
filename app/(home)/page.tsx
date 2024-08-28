import { auth } from "@/auth";
import { BackgroundCellAnimation } from "@/components/BackgroundRippleEffect";
import Dashboard from "@/components/dashboard/dashboard";
import LandingPage from "@/components/landing-components/landing-page";
import {
	getActiveWorks,
	getLastUpdatedMaterials,
	getUserPermissions,
} from "@/lib/server-actions";

const Home = async () => {
	const authenticatedUser = await auth();
	const userPermissions = await getUserPermissions();
	const materials = await getLastUpdatedMaterials();
	const works = await getActiveWorks();
	return (
		<div className="h-full w-full bg-myBackground flex items-start justify-center">
			<div className="w-full h-full mx-auto">
				<BackgroundCellAnimation>
					{authenticatedUser ? (
						<Dashboard
							authenticatedUser={authenticatedUser}
							userPermissions={userPermissions}
							materials={materials}
							works={works}
						/>
					) : (
						<LandingPage />
					)}
				</BackgroundCellAnimation>
			</div>
		</div>
	);
};

export default Home;
