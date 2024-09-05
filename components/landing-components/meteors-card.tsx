import { FeaturesCard } from "./features-card"

export function Meteorss() {
    return (
        <div className="w-full">
            <div className="relative w-full">
                <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center overflow-hidden py-8 xl:w-1/2 xl:px-4">
                    <FeaturesCard />
                </div>
            </div>
        </div>
    )
}
