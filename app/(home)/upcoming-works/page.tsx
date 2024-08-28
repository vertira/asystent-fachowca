import ActiveWorks from "@/components/upcoming-works/active-works";
import { getActiveWorks } from "@/lib/server-actions";

const UpcomingWorks = async () => {
	const activeWorks = await getActiveWorks();
	return (
		<div className="flex-1 w-full mx-auto px-6 pt-2 md:px-0">
			<div className="flex justify-start md:mx-auto md:w-3/4 py-6 md:px-4 ">
				<h1 className="text-4xl font-extrabold text-balance">
					Zaplanowane Prace!
				</h1>
			</div>
			<ActiveWorks activeWorks={activeWorks} />
		</div>
	);
};

export default UpcomingWorks;
