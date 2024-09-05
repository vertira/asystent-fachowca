import { CardMyWork } from "@/components/ui/card-my-work";
import Link from "next/link";
import { PiPlus } from "react-icons/pi";

export const MyWorks = ({
  works,
  isPremium,
}: {
  works: any;
  isPremium: any;
}) => {
  return (
    <div className="flex-1 flex flex-col bg-myBackground">
      <div className="mx-auto w-full md:w-3/4 pt-2 md:pt-4 px-4">
        {works.length === 0 ? (
          <>
            <div className="flex flex-col justify-start gap-4 md:mx-auto py-8 px-6 md:px-0 md:py-6">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <h1 className="text-3xl font-bold">Brak prac 😥</h1>
                {isPremium ? (
                  ""
                ) : (
                  <p className="text-first-muted">
                    ({works.length} / 2){" "}
                    <span className="text-myText-muted">darmowe prace</span>
                  </p>
                )}
              </div>
              <p className="text-myText-muted text-balance text-center md:text-start">
                Wygląda na to, że nie zaplanowałeś żadnej pracy, kliknij poniżej
                aby zacząć !
              </p>
              <Link
                href={"/new-work"}
                className="flex mt-4 w-60 max-sm:mx-auto"
              >
                <div
                  className="bg-cardBackground text-first-muted p-4 
            rounded-md  w-60 h-56 flex items-center justify-center flex-col"
                >
                  <PiPlus className="text-3xl mb-4 text-myText" />
                  <p className="text-lg">Dodaj nową pracę !</p>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-start gap-4 md:mx-auto py-6 px-6 md:px-0">
              <h1 className="text-4xl font-extrabold text-myText h-fit">
                Twoje prace
              </h1>
              {isPremium ? (
                ""
              ) : (
                <p className="text-first-muted">
                  ({works.length} / 2){" "}
                  <span className="text-myText-muted">darmowe prace</span>
                </p>
              )}
            </div>
            <p className="text-myText-muted">
              Przeglądaj i zarządzaj historią wykonanych oraz zaplanowanych prac
              budowlanych
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-10">
              {works.map((work: any) => (
                <Link href={`/edit/${work.id} `} key={work.id}>
                  <CardMyWork work={work} url={work.images[0]?.url} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
