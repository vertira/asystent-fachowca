import Image from "next/image"

const SpinnerSmall = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="relative h-32 w-32 animate-spin rounded-full border-b border-t border-[#ff7400]"></div>
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

export default SpinnerSmall
