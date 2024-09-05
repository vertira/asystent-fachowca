import { auth } from "@/auth"
import HeadingHomepage from "./heading-card"
import { BackgroundGradient } from "./BackgroundGradient"
import WorkItem from "./work-item"

interface ActiveWorksProps {
    activeWorks: any
}

const ActiveWorks: React.FC<ActiveWorksProps> = async ({ activeWorks }) => {
    const authenticatedUser = await auth()
    const currentDate = new Date()
    const formattedActiveWorks = activeWorks?.map((work: any) => {
        const {
            id,
            name,
            slug,
            address,
            description,
            mapWork,
            startDate,
            endDate,
            createdAt,
            updatedAt,
            userId,
            images,
            categories,
        } = work

        const imageUrls = images.map((image: any) => image.url)
        const categoryNames = categories.map((category: any) => category.name)

        return {
            id,
            name,
            slug,
            address,
            description,
            mapWork,
            startDate,
            endDate,
            createdAt,
            updatedAt,
            userId,
            images: imageUrls,
            categories: categoryNames,
        }
    })
    return (
        <div className="mx-auto grid w-full flex-1 grid-cols-1 gap-20 pb-10 md:w-3/4 md:px-4 md:pt-6">
            <BackgroundGradient className="mx-auto flex h-full w-full max-w-4xl flex-col items-center rounded-xl bg-cardBackground px-4 py-10">
                <div className="w-full max-w-xl">
                    <HeadingHomepage text="W trakcie prac" />
                    <div className="mt-5 flex flex-col gap-5">
                        {formattedActiveWorks?.map((work: any) =>
                            currentDate > new Date(work.startDate) &&
                            currentDate < new Date(work.endDate) ? (
                                <WorkItem
                                    key={work.id}
                                    work={work}
                                    authenticatedUser={authenticatedUser}
                                />
                            ) : (
                                ""
                            ),
                        )}
                    </div>
                </div>
            </BackgroundGradient>
            <BackgroundGradient className="mx-auto flex h-full w-full max-w-4xl flex-col items-center rounded-xl bg-cardBackground px-4 py-10">
                <div className="w-full max-w-xl">
                    <HeadingHomepage text="Nadchodzące prace" />
                    <div className="mt-5 flex flex-col gap-5">
                        {formattedActiveWorks?.map((work: any) =>
                            currentDate < new Date(work.startDate) ? (
                                <WorkItem
                                    key={work.id}
                                    work={work}
                                    authenticatedUser={authenticatedUser}
                                />
                            ) : (
                                ""
                            ),
                        )}
                    </div>
                </div>
            </BackgroundGradient>
        </div>
    )
}

export default ActiveWorks
