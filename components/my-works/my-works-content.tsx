import { CardMyWork } from "@/components/ui/card-my-work"
import Link from "next/link"
import { PiPlus } from "react-icons/pi"

export const MyWorks = ({
    works,
    isPremium,
}: {
    works: any
    isPremium: any
}) => {
    return (
        <div className="flex flex-1 flex-col bg-myBackground">
            <div className="mx-auto w-full px-4 pt-2 md:w-3/4 md:pt-4">
                {works.length === 0 ? (
                    <>
                        <div className="flex flex-col justify-start gap-4 px-6 py-8 md:mx-auto md:px-0 md:py-6">
                            <div className="flex flex-col items-center gap-2 md:flex-row">
                                <h1 className="text-3xl font-bold">
                                    Brak prac 😥
                                </h1>
                                {isPremium ? (
                                    ""
                                ) : (
                                    <p className="text-first-muted">
                                        ({works.length} / 2){" "}
                                        <span className="text-myText-muted">
                                            darmowe prace
                                        </span>
                                    </p>
                                )}
                            </div>
                            <p className="text-balance text-center text-myText-muted md:text-start">
                                Wygląda na to, że nie zaplanowałeś żadnej pracy,
                                kliknij poniżej aby zacząć !
                            </p>
                            <Link
                                href={"/new-work"}
                                className="mt-4 flex w-60 max-sm:mx-auto"
                            >
                                <div className="flex h-56 w-60 flex-col items-center justify-center rounded-md bg-cardBackground p-4 text-first-muted">
                                    <PiPlus className="mb-4 text-3xl text-myText" />
                                    <p className="text-lg">
                                        Dodaj nową pracę !
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-start gap-4 px-6 py-6 md:mx-auto md:px-0">
                            <h1 className="h-fit text-4xl font-extrabold text-myText">
                                Twoje prace
                            </h1>
                            {isPremium ? (
                                ""
                            ) : (
                                <p className="text-first-muted">
                                    ({works.length} / 2){" "}
                                    <span className="text-myText-muted">
                                        darmowe prace
                                    </span>
                                </p>
                            )}
                        </div>
                        <p className="text-myText-muted">
                            Przeglądaj i zarządzaj historią wykonanych oraz
                            zaplanowanych prac budowlanych
                        </p>
                        <div className="my-10 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                            {works.map((work: any) => (
                                <Link href={`/edit/${work.id} `} key={work.id}>
                                    <CardMyWork
                                        work={work}
                                        url={work.images[0]?.url}
                                    />
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
