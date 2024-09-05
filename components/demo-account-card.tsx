import { tourLogin } from "@/lib/user-actions";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface DemoAccount {
  account: string;
  role: string;
  contentNum: number;
}
export const DemoAccount = ({ account, role, contentNum }: DemoAccount) => {
  const { toast } = useToast();
  const router = useRouter();
  const content = [
    {
      first: "Dostęp bez ograniczeń",
      second: "Tworzenie kont dla pracowników",
      third: "Zarządzanie uprawnieniami pracowników",
    },
    {
      first: "Sekcje tylko z przyznanym dostępem",
      second: "Chat pracowniczy",
      third: "Zarządzanie uprawnieniami pracowników",
    },
  ];
  const demoAccountLogin = async () => {
    try {
      if (role === "boss") {
        await tourLogin("boss@boss.app", "Boss1234");
      } else if (role === "staff") {
        await tourLogin("staff@boss.app", "Staff1234");
      }
      router.refresh();
    } catch {
      console.log("ERROR");
    } finally {
      toast({
        variant: "success",
        title: `Pomyślnie zalogowano na konto ${role.toUpperCase()}`,
        duration: 1500
      });
    }
  };
  return (
    <div className="bg-myBackground  rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="p-1 bg-first-muted rounded-t-md"></div>
      <div className="p-8">
        <h2 className="text-3xl font-bold text-myText mb-4">{account}</h2>
        <ul className="text-sm text-myText mb-6 max-w-3/4">
          <li className="mb-2 flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {content[contentNum].first}
          </li>
          <li className="mb-2 flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {content[contentNum].second}
          </li>
          <li className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {content[contentNum].third}
          </li>
        </ul>
      </div>
      <div className="p-4">
        <button
          type="submit"
          className="w-full bg-first-muted text-white rounded-full px-4 py-2 hover:bg-first focus:outline-none focus:shadow-outline-blue active:bg-first transition-all"
          onClick={demoAccountLogin}
        >
          Wybierz
        </button>
      </div>
    </div>
  );
};
