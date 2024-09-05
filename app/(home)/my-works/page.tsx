import { getHistoryWorks, isUserPremium } from "@/lib/server-actions";
import { MyWorks } from "../../../components/my-works/my-works-content";

const MyWorksPage = async () => {
  const works = await getHistoryWorks();
  const isPremium = await isUserPremium();
  return <MyWorks works={works} isPremium={isPremium} />;
};

export default MyWorksPage;
