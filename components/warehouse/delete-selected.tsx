import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { deleteManyMaterials } from "@/lib/server-actions";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSWRConfig } from "swr";
import { Materials } from "@/types/material";
import { IoTrashBinOutline } from "react-icons/io5";

interface DeleteSelectedProps {
	table: Table<Materials>;
}

export const DeleteSelected: React.FC<DeleteSelectedProps> = ({ table }) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const { toast } = useToast();
	const { mutate } = useSWRConfig();

	const handleDeleteSelected = async () => {
		const selectedIds = table
			.getFilteredSelectedRowModel()
			.rows.map((row) => row.original.id)
			.filter((id): id is string => id !== undefined);

		if (selectedIds.length === 0) {
			toast({
				variant: "destructive",
				title: "Nie wybrano żadnych wierszy do usunięcia.",
			});
			return;
		}
		setIsDeleting(true);

		try {
			const deletedCount = await deleteManyMaterials(selectedIds);
			toast({
				title: `Pomyślnie usunięto ${deletedCount} materiałów.`,
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Wystąpił błąd podczas usuwania materiałów. Spróbuj ponownie.",
			});
		} finally {
			setIsDeleting(false);
			table.toggleAllRowsSelected(false);
			mutate("getMaterialByUserId");
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghostsecond"
					size="sm"
					disabled={
						isDeleting || table.getFilteredSelectedRowModel().rows.length === 0
					}
				>
					<IoTrashBinOutline className="text-xl md:mr-2" />
					<span className="hidden lg:block">Usuń zaznaczone</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="bg-cardBackground border borderColor">
				<AlertDialogHeader className="text-myText">
					<AlertDialogTitle>Jesteś pewny?</AlertDialogTitle>
					<AlertDialogDescription className="text-myText-muted">
						Tego działania nie można cofnąć. Spowoduje to trwałe usunięcie
						Twoich danych z naszych serwerów.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="border borderColor text-myText-muted hover:bg-cardBackground hover:text-first-muted bg-cardBackground">
						Anuluj
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteSelected}
						className="bg-myBackground hover:border-first-muted hover:bg-cardBackground text-first-muted border borderColor"
					>
						{isDeleting ? "Usuwanie..." : "Usuń"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
