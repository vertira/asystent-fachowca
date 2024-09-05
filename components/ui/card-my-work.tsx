import { Badge } from "./badge";

export function CardMyWork({ work, url }: any) {
  const urlPath = url;
  return (
    <div className="w-full group/card">
      <div
        style={{
          backgroundImage: `url("${
            urlPath ? urlPath : "/logo/small-logo.png"
          }")`,
          backgroundSize: `${urlPath ? "cover" : "25% 25%"}`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={`
          cursor-pointer  relative card h-96 rounded-md ${
            urlPath ? "" : "border borderColor"
          } shadow-xl min-w-full mx-auto  flex flex-col justify-between p-4`}
      >
        <Badge
          className={`absolute top-4 left-4 z-10 ${
            work.status === "ACTIVE"
              ? "bg-green-500 text-myBackground"
              : "bg-myText-muted text-myBackground"
          }`}
        >
          {work.status === "ACTIVE" ? "AKTYWNA" : "WYGASŁA"}
        </Badge>
        <div className="absolute w-full rounded-md h-full top-0 left-0 transition duration-500 bg-black/70 group-hover/card:bg-black/20"></div>
        <div className="h-full flex flex-col items-start justify-end pl-2 z-10">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {work.name}
          </h1>
          <p className="font-normal text-sm  text-gray-50 relative z-10 my-4">
            {work.address}
          </p>
        </div>
      </div>
    </div>
  );
}
