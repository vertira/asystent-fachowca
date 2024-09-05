import { Badge } from "./badge"

export function CardMyWork({ work, url }: any) {
    const urlPath = url
    return (
        <div className="group/card w-full">
            <div
                style={{
                    backgroundImage: `url("${
                        urlPath ? urlPath : "/logo/small-logo.png"
                    }")`,
                    backgroundSize: `${urlPath ? "cover" : "25% 25%"}`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                className={`card relative h-96 cursor-pointer rounded-md ${
                    urlPath ? "" : "borderColor border"
                } mx-auto flex min-w-full flex-col justify-between p-4 shadow-xl`}
            >
                <Badge
                    className={`absolute left-4 top-4 z-10 ${
                        work.status === "ACTIVE"
                            ? "bg-green-500 text-myBackground"
                            : "bg-myText-muted text-myBackground"
                    }`}
                >
                    {work.status === "ACTIVE" ? "AKTYWNA" : "WYGASŁA"}
                </Badge>
                <div className="absolute left-0 top-0 h-full w-full rounded-md bg-black/70 transition duration-500 group-hover/card:bg-black/20"></div>
                <div className="z-10 flex h-full flex-col items-start justify-end pl-2">
                    <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">
                        {work.name}
                    </h1>
                    <p className="relative z-10 my-4 text-sm font-normal text-gray-50">
                        {work.address}
                    </p>
                </div>
            </div>
        </div>
    )
}
