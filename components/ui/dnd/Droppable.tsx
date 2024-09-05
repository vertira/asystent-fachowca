import React from "react"
import { useDroppable } from "@dnd-kit/core"
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Image from "next/image"
interface Employee {
    id: string
    name: string
    avatar: string
}
interface EmployeeItemProps {
    employee: Employee
    user: any
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee, user }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: employee.id,
        disabled: user.role === "STAFF" && employee.id === user.employerId,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 1,
        touchAction: "none",
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="mb-2 cursor-grab rounded bg-green-500/80 p-2 shadow"
        >
            <Image
                width={40}
                height={40}
                src={employee.avatar}
                alt={employee.name}
                className="mr-2 inline-block h-10 w-10 rounded-full"
            />
            <span className="font-extrabold">{employee.name}</span>
        </div>
    )
}

interface DropboxProps {
    id: string
    employees: Employee[]
    user: any
}

const Dropbox: React.FC<DropboxProps> = ({ id, employees, user }) => {
    const { setNodeRef, isOver } = useDroppable({ id })

    return (
        <div
            ref={setNodeRef}
            className={`mx-auto min-h-[200px] w-full rounded bg-cardBackground p-4 lg:w-1/2 ${
                isOver ? "border-2 border-green-500/80" : ""
            }`}
        >
            <h2 className="pointer-events-none mb-4 w-fit select-none text-xl font-bold">
                Przypisani pracownicy:
            </h2>
            <SortableContext
                items={employees}
                strategy={verticalListSortingStrategy}
            >
                {employees.map((employee) => (
                    <EmployeeItem
                        key={employee.id}
                        employee={employee}
                        user={user}
                    />
                ))}
            </SortableContext>
        </div>
    )
}

export default Dropbox
