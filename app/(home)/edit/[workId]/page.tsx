import { Badge } from "@/components/ui/badge";
import { getUser, getworkById } from "@/lib/server-actions";
import Image from "next/image";
import Deletework from "./delete-work";
import AddresEdit from "@/components/edit-work/addressEdit";
import DateEdit from "@/components/edit-work/dateEdit";
import CategoryEdit from "@/components/edit-work/category-edit";
import MaterialsEdit from "@/components/edit-work/materials-edit";
import { auth } from "@/auth";
import GoBackButton from "@/components/ui/go-back-button";
import PhotosEdit from "@/components/edit-work/photos-edit";
import StaffEdit from "@/components/edit-work/staff-edit";
interface IParams {
	authenticatedUser: any;
	workId: string;
}

const WorkIDPage = async ({ params }: { params: IParams }) => {
	const authUser = await auth();
	if (!authUser) {
		window.location.replace("/");
	}
	const user = await getUser();
	const work = await getworkById(params.workId);
	if (!work) {
		return <div>Work not found</div>;
	}
	return (
		<div className="flex-1 flex flex-col bg-myBackground">
			<div className="mx-auto w-full md:w-3/4 pt-2 md:pt-4 px-4">
				<GoBackButton />

				<div className="flex items-center justify-between py-4">
					<div className="flex items-center gap-x-4">
						<Image
							src={`${
								work.images[0]?.url
									? work.images[0]?.url
									: "/logo/small-logo.png"
							}`}
							alt="logo"
							width={500}
							height={500}
							className={`h-20 w-20 md:h-40 md:w-40 ${
								work.images[0]?.url ? "" : "p-2"
							} border borderColor rounded-lg object-contain`}
						/>

						<div className="space-y-1">
							<h1 className="text-3xl font-medium">{work.name}</h1>
							{work.status === "ACTIVE" && (
								<Badge className="bg-green-500 pointer-events-none text-myBackground">
									AKTYWNA
								</Badge>
							)}
							{work.status === "EXPIRED" && (
								<Badge className="bg-myText-muted text-black">WYGASŁA</Badge>
							)}
						</div>
					</div>
					<Deletework workId={work.id} />
				</div>
				<div className="mx-auto">
					<div className="py-4">
						<CategoryEdit work={work} />
						<AddresEdit work={work} />
						<DateEdit work={work} />
						<StaffEdit work={work} user={user} />
						<MaterialsEdit work={work} />
						<PhotosEdit work={work} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkIDPage;
