import RegistrationSteps from "@/components/new-work/steps";
import { getActiveWorks } from "@/lib/server-actions";

const NewWorkPage = async () => {
	const works = await getActiveWorks();
	return <RegistrationSteps works={works} />;
};

export default NewWorkPage;
