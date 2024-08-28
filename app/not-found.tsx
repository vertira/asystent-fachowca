import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
	return (
		<div className="flex justify-center items-center w-full h-screen bg-black">
			<div className="text-center flex items-center flex-col gap-2 ">
				<Link href="/">
					<Image
						priority
						src="/logo/logo.png"
						alt="404"
						width={500}
						height={500}
						className="w-40  border-gray-200 rounded-md  hover:cursor-pointer"
					/>
				</Link>

				<div className="text-3xl font-bold">
					Ooops! Wygląda na to, że coś poszło nie tak.
				</div>
				<div className="text-lg text-gray-200">
					Strona, której szukasz, nie istnieje.
				</div>

				<Link
					href="/"
					className="bg-[#ff6154] text-white px-4 py-2 rounded-md mt-4"
				>
					Strona główna
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
