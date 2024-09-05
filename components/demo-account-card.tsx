import { tourLogin } from "@/lib/user-actions"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

interface DemoAccount {
    account: string
    role: string
    contentNum: number
}
export const DemoAccount = ({ account, role, contentNum }: DemoAccount) => {
    const { toast } = useToast()
    const router = useRouter()
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
    ]
    const demoAccountLogin = async () => {
        try {
            if (role === "boss") {
                await tourLogin("boss@boss.app", "Boss1234")
            } else if (role === "staff") {
                await tourLogin("staff@boss.app", "Staff1234")
            }
            router.refresh()
        } catch {
            console.log("ERROR")
        } finally {
            toast({
                variant: "success",
                title: `Pomyślnie zalogowano na konto ${role.toUpperCase()}`,
                duration: 1500,
            })
        }
    }
    return (
        <div className="transform rounded-lg bg-myBackground shadow-lg transition-transform hover:scale-105">
            <div className="rounded-t-md bg-first-muted p-1"></div>
            <div className="p-8">
                <h2 className="mb-4 text-3xl font-bold text-myText">
                    {account}
                </h2>
                <ul className="max-w-3/4 mb-6 text-sm text-myText">
                    <li className="mb-2 flex items-center">
                        <svg
                            className="mr-2 h-4 w-4 text-green-500"
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
                            className="mr-2 h-4 w-4 text-green-500"
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
                            className="mr-2 h-4 w-4 text-green-500"
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
                    className="focus:shadow-outline-blue w-full rounded-full bg-first-muted px-4 py-2 text-white transition-all hover:bg-first focus:outline-none active:bg-first"
                    onClick={demoAccountLogin}
                >
                    Wybierz
                </button>
            </div>
        </div>
    )
}
