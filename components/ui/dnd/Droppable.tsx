import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
interface Employee {
	id: string;
	name: string;
	avatar: string;
}
interface EmployeeItemProps {
	employee: Employee;
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: employee.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		zIndex: isDragging ? 1000 : 1,
		touchAction: "none",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="mb-2 p-2 bg-green-500/80 rounded shadow cursor-grab"
		>
			<Image
				width={40}
				height={40}
				src={employee.avatar}
				alt={employee.name}
				className="w-10 h-10 rounded-full inline-block mr-2"
			/>
			<span className="font-extrabold">{employee.name}</span>
		</div>
	);
};

interface DropboxProps {
	id: string;
	employees: Employee[];
}

const Dropbox: React.FC<DropboxProps> = ({ id, employees }) => {
	const { setNodeRef, isOver } = useDroppable({ id });

	return (
		<div
			ref={setNodeRef}
			className={`w-full lg:w-1/2 bg-cardBackground p-4 rounded min-h-[200px] mx-auto ${
				isOver ? "border-2 border-green-500/80" : ""
			}`}
		>
			<h2 className="text-xl font-bold mb-4 w-fit pointer-events-none select-none">
				Przypisani pracownicy:
			</h2>
			<SortableContext items={employees} strategy={verticalListSortingStrategy}>
				{employees.map((employee) => (
					<EmployeeItem key={employee.id} employee={employee} />
				))}
			</SortableContext>
		</div>
	);
};

export default Dropbox;
