import Image from "next/image"
const Spinner = () => {
    return (
        <div className="flex w-full flex-1 items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#ff7400]"></div>
            <div className="absolute flex flex-col items-center justify-center">
                <Image
                    src="/logo/small-logo.png"
                    width={50}
                    height={50}
                    alt="logo"
                />
                <span className="text-sm text-myText-muted">Ładuję...</span>
            </div>
        </div>
    )
}

export default Spinner
