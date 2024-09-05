"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modals/modal";
import { toast } from "@/components/ui/use-toast";
import { deleteWork } from "@/lib/server-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiTrash } from "react-icons/pi";

interface DeleteWorkProps {
  workId: string;
}

const DeleteWork: React.FC<DeleteWorkProps> = ({ workId }) => {
  const router = useRouter();

  const [confirmationInput, setConfirmationInput] = useState("");
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);

  const handleConfirmationInputChange = (e: any) => {
    const inputText = e.target.value.toLowerCase();
    setConfirmationInput(inputText);
    setIsDeleteButtonEnabled(inputText === "usuwam");
  };

  const handleCancel = () => {
    setDeleteWorkModalVisible(false);
  };

  const [deleteWorkModalVisible, setDeleteWorkModalVisible] = useState(false);

  const handleDeleteWorkClick = () => {
    setDeleteWorkModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (confirmationInput === "usuwam") {
      try {
        await deleteWork(workId);
        setDeleteWorkModalVisible(false);
        router.push("/my-works");
        router.refresh();
        toast({
          variant: "success",
          title: `Pomyślnie usunięto pracę!`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Button
        variant="ghostsecond"
        onClick={handleDeleteWorkClick}
        className="flex items-center p-4 lg:p-6 gap-1 hover:text-red-500 justify-center"
      >
        <PiTrash className="text-2xl mb-1 text-red-500" />
        <span className="hidden lg:block">Usuń</span>
      </Button>

      <Modal
        visible={deleteWorkModalVisible}
        setVisible={setDeleteWorkModalVisible}
      >
        <div>
          <h1 className="text-4xl font-extrabold text-red-500">Usuń pracę</h1>
          <p className="text-sm py-2 text-red-500 font-bold mb-10">
            Tej akcji nie można cofnąć. Spowoduje ona trwałe usunięcie twojej
            pracy i całej twojej zawartości.
          </p>
          <p className="text-base">
            Po usunięciu twojej pracy cała twoja zawartość zostanie trwale
            usunięta, w tym twoje prace i ustawienia prac. Tej akcji nie można
            cofnąć. Spowoduje ona trwałe usunięcie twojej pracy i całej twojej
            zawartości.
          </p>
          <p className="text-sm my-2">
            Aby potwierdzić usunięcie, wpisz poniżej `
            <span className="text-red-500 font-bold">usuwam</span>`:
          </p>

          <Input
            type="text"
            className="border w-full focus-visible:ring-red-500 p-4 rounded-xl mt-4 focus:outline-none"
            value={confirmationInput}
            onChange={handleConfirmationInputChange}
          />

          <div className="flex justify-end gap-4 mt-10">
            <Button variant="ghostsecond" className="" onClick={handleCancel}>
              Anuluj
            </Button>
            <Button
              variant="ghostsecond"
              className={`${
                isDeleteButtonEnabled
                  ? "bg-red-500/60 text-myText hover:text-myText hover:bg-red-500 text-sm"
                  : "cursor-not-allowed"
              } px-4 py-2 `}
              disabled={!isDeleteButtonEnabled}
              onClick={handleConfirmDelete}
            >
              Usuń
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteWork;
