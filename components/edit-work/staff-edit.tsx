"use client";
import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { HardHat, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import EmployeeList from "../ui/dnd/Draggable";
import Dropbox from "../ui/dnd/Droppable";
import Image from "next/image";
import { updateStaffWork } from "@/lib/server-actions";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export interface Employee {
	id: string;
	name: string;
	avatar: string;
}

export default function StaffEdit({ work, user }: { work: any; user: any }) {
	const router = useRouter();
	const initialWorkers: Employee[] = user.employees.map((employe: any) => ({
		id: employe.id,
		name: employe.name,
		avatar: employe.image,
	}));
	
	const initialEmployees: Employee[] = user.role === "EMPLOYER" 
		? [...initialWorkers, {id: user.id, name: user.name, avatar: user.image}] 
		: initialWorkers;
	const initialAssigned: Employee[] = work.assignedStaff.map(
		(employe: any) => ({
			id: employe.id,
			name: employe.name,
			avatar: employe.image,
		})
	);
	const filteredEmployees = initialEmployees.filter(
		(employee) =>
			!initialAssigned.some((assigned) => assigned.id === employee.id)
	);
	const [employees, setEmployees] = useState<Employee[]>(filteredEmployees);
	const [assignedEmployees, setAssignedEmployees] =
		useState<Employee[]>(initialAssigned);
	const [activeId, setActiveId] = useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		console.log("Drag over:", { active: active.id, over: over?.id });
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		console.log("Drag end:", { active: active.id, over: over?.id });
		if (!over || (over.id !== "dropbox" && over.id !== "employeeList")) return;

		const activeEmployee = [...employees, ...assignedEmployees].find(
			(emp) => emp.id === active.id
		);
		if (!activeEmployee) return;

		if (
			over.id === "dropbox" &&
			!assignedEmployees.some((emp) => emp.id === active.id)
		) {
			console.log("Moving to dropbox");
			setAssignedEmployees((prev) => [...prev, activeEmployee]);
			setEmployees((prev) => prev.filter((emp) => emp.id !== active.id));
		} else if (
			over.id === "employeeList" &&
			!employees.some((emp) => emp.id === active.id)
		) {
			console.log("Moving to employeeList");
			setEmployees((prev) => [...prev, activeEmployee]);
			setAssignedEmployees((prev) =>
				prev.filter((emp) => emp.id !== active.id)
			);
		}

		setActiveId(null);
	};

	const activeEmployee = [...employees, ...assignedEmployees].find(
		(emp) => emp.id === activeId
	);
	const [isEdit, setIsEdit] = useState(false);
	const handleSubmit = async () => {
		try {
			await updateStaffWork(work.id, assignedEmployees);
			toast({
				variant: "success",
				title: `Pomyślnie przypisano pracowników: ${assignedEmployees.map(
					(staff) => staff.name
				)}`,
			});
			router.refresh();
			setIsEdit(false);
		} catch {
			toast({
				variant: "destructive",
				title: "Wystąpił błąd",
			});
		}
	};
	return (
		<Accordion type="single" collapsible>
			<AccordionItem
				value="item-1"
				className="borderColor data-[state|=open]:border-none max-w-full"
			>
				<AccordionTrigger
					className="hover:bg-cardBackground transition-all data-[state|=open]:bg-cardBackground"
					onClick={() => setIsEdit(false)}
				>
					<span className="text-2xl font-extrabold flex gap-4 text-first-muted px-4 ">
						<HardHat className="text-myText" />
						Pracownicy
						{isEdit && (
							<span className="text-myText text-sm">
								<sup>*edytowanie</sup>
							</span>
						)}
					</span>
				</AccordionTrigger>
				<AccordionContent>
					<div className="flex items-center gap-4 mt-4">
						<Button
							variant="ghostsecond"
							className="text-first"
							onClick={() => {
								setIsEdit((prevState) => !prevState);
							}}
						>
							<Pencil className="text-lg" />
						</Button>
						{isEdit && (
							<Button
								variant="ghostsecond"
								disabled={
									JSON.stringify(assignedEmployees) ===
										JSON.stringify(initialAssigned)
								}
								className="my-2 w-1/4 self-end"
								onClick={handleSubmit}
							>
								Zapisz
							</Button>
						)}
					</div>
					<div className="w-full mt-4">
						<DndContext
							sensors={sensors}
							onDragStart={handleDragStart}
							onDragOver={handleDragOver}
							onDragEnd={handleDragEnd}
							collisionDetection={closestCenter}
						>
							<div className="flex flex-col lg:flex-row w-full gap-10 justify-between">
								{isEdit && (
									<EmployeeList employees={employees} id="employeeList" />
								)}
								<Dropbox employees={assignedEmployees} user={user} id="dropbox" />
							</div>
							<DragOverlay>
								{activeEmployee ? (
									<div className="p-2 bg-first-muted/80 max-w-sm rounded shadow opacity-80 cursor-grabbing">
										<Image
											width={40}
											height={40}
											src={activeEmployee.avatar}
											alt={activeEmployee.name}
											className="w-10 h-10 rounded-full inline-block mr-2"
										/>
										<span className="font-extrabold">
											{activeEmployee.name}
										</span>
									</div>
								) : null}
							</DragOverlay>
						</DndContext>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
