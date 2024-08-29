"use client";
import React from "react";
import { CalendarDashboard } from "./calendar";
import { AddMessage } from "./add-message";
import Messages from "./messages";
import { ShopingList } from "./shoping-list";
import { Calendar } from "lucide-react";
interface Dashboard {
	authenticatedUser: any;
	materials: any;
	works: any;
	userPermissions: any;
}
const Dashboard: React.FC<Dashboard> = ({
	authenticatedUser,
	userPermissions,
	materials,
	works,
}) => {
	return (
		<div className="min-h-screen bg-transparent w-full pt-6 px-6 xl:px-0">
			<div className="flex justify-start items-center mb-6">
				<h1 className="text-4xl font-extrabold text-myText h-fit">
					Witaj, {authenticatedUser.user.name} !
				</h1>
			</div>
			<div className="grid grid-rows-1 xl:grid-cols-3 gap-6 xl:max-h-[calc(100vh-100px)] ">
				<div className="col-span-2 xl:col-span-2 glassCard p-4 flex flex-col rounded-lg shadow">
					<div className="w-full h-full bg-cardBackground/30 -z-10 absolute rounded-lg top-0 left-0"></div>
					<div className="glassPattern3 w-full h-full absolute rounded-lg top-0 left-0"></div>
					<h2 className="text-2xl font-extrabold mb-4 text-myText flex gap-2">
						Kalendarz prac
						<Calendar className="text-first-muted" />
					</h2>
					<div className="flex w-full xl:overflow-y-scroll flex-1 z-20">
						{userPermissions.role === "EMPLOYER" ? (
							<CalendarDashboard />
						) : userPermissions.permissions.calendar ? (
							<CalendarDashboard />
						) : (
							"Nie masz uprawnień aby wyświetlić ten element"
						)}
					</div>
				</div>
				<div className="col-span-2 xl:col-span-1 xl:row-span-1  glassCard flex flex-col overflow-hidden max-h-[50vh] xl:max-h-full p-4 rounded-lg shadow">
					<div className="glassBackground -z-20 w-full h-full absolute rounded-lg top-0 left-0"></div>
					<div className="flex items-center gap-2">
						<h2 className="text-xl font-semibold ">Ważne wiadomości</h2>
						<AddMessage authenticatedUser={authenticatedUser} />
					</div>
					<Messages />
				</div>
				<div className="col-span-2 xl:col-span-1 relative bg-cardBackground/90 xl:h-[40vh] p-4 rounded-lg shadow">
					<div className="glassPattern w-full h-full absolute rounded-lg top-0 left-0"></div>
					<h2 className="text-2xl font-bold mb-4 text-first">
						Ostatnio dodane materiały
					</h2>
					<ul className="py-4">
						{userPermissions.role === "EMPLOYER"
							? materials.map((material: any) => (
									<li
										key={material.id}
										className="flex justify-between items-center py-2 border-b border-white/50"
									>
										<span>{material.name}</span>
										<span className="text-myText-muted">
											{material.quantity} {material.unit}
										</span>
									</li>
							  ))
							: userPermissions.permissions.warehouse
							? materials.map((material: any) => (
									<li
										key={material.id}
										className="flex justify-between items-center py-2 border-b border-white/50"
									>
										<span>{material.name}</span>
										<span className="text-myText-muted">
											{material.quantity} {material.unit}
										</span>
									</li>
							  ))
							: "Nie masz uprawnień aby wyświetlić ten element"}
					</ul>
				</div>
				<div className="bg-cardBackground/50 max-h-[70vh] xl:h-[40vh] overflow-y-scroll col-span-2 rounded-lg  mb-10 relative">
					<ShopingList works={works} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
