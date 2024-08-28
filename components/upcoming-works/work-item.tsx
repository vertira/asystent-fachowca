"use client";

import { useState } from "react";
import { RxArrowRight } from "react-icons/rx";

import WorkModal from "../ui/modals/product-modal";
import Modal from "../ui/modals/modal";
import AuthContent from "../navbar/auth-content";
import Link from "next/link";
import { EvervaultCard } from "./hover-card";

interface WorkItemProps {
	work: any;
	authenticatedUser: any;
}

const WorkItem: React.FC<WorkItemProps> = ({ work }) => {
	const [currentWork, setCurrentWork] = useState<any>(null);

	const releaseDate = work.startDate && new Date(work.startDate);
	const endDate = work.endDate && new Date(work.endDate);
	const displayRangeDate = `${releaseDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
	return (
		<EvervaultCard>
			<Link
				href={`/edit/${work.id}`}
				className="py-8 group/item  w-full cursor-pointer px-2  "
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<RxArrowRight className="group-hover/item:text-first-muted hidden lg:block" />
						<div className="ml-4 flex flex-col">
							<div className="flex items-center gap-x-2">
								<span className="text-sm">🚧</span>
								<h1 className="text-base font-normal">{work.name}</h1>
							</div>
							<div className="flex items-center gap-x-2">
								<span className="text-sm">📌</span>
								<p className="text-myText text-sm md:text-base font-normal pr-2 w-3/4 md:w-full">
									{work.address}
								</p>
							</div>
							<div className="hidden md:flex gap-x-2 items-center">
								<div className="text-xs md:text-base font-semibold text-myText">
									<div className="flex gap-x-1 items-center">
										📅 {displayRangeDate}
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<span className="text-base">🔧</span>
								{work.categories.map((category: string) => (
									<div
										key={category}
										className="text-xs font-normal text-myText-muted "
									>
										<div className="flex gap-x-1 items-center max-w-full">
											<div className="ml-1 text-myText">•</div>
											<span className="bg-first text-myBackground rounded-3xl px-2 md:px-4 py-px">
												{category}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="text-sm"></div>
				</div>
			</Link>
		</EvervaultCard>
	);
};

export default WorkItem;
