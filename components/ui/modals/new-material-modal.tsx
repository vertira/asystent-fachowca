import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

interface ModalProps {
  visible: boolean;
  setVisible: (state: boolean) => void;
  children: React.ReactNode;
}

const NewMaterialModal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  children,
}) => {
  return (
    <Transition show={visible} as={Fragment}>
      <Dialog onClose={() => setVisible(true)} static={true} open={visible}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-50 transition-opacity bg-black bg-opacity-75 backdrop-filter backdrop-blur"></div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100 "
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100 "
          leaveTo="opacity-0 scale-95 0"
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Dialog.Panel className="relative h-full xl:h-[90vh] w-full mt-auto sm:mt-0 md:w-4/5 xl:w-1/2  flex  rounded-sm shadow-md">
              <div className="w-full h-full bg-cardBackground/95 -z-10 absolute md:rounded-lg top-0 left-0"></div>
              <div className="glassPattern3 w-full h-full rotate-180 absolute md:rounded-lg top-0 left-0"></div>
              <div className="absolute top-0 right-0 mt-4 mr-4">
                <button
                  onClick={() => setVisible(false)}
                  className="hover:opacity-70 focus:outline-none "
                >
                  <X className="w-8 h-8 " aria-hidden="true" />
                </button>
              </div>

              <div className="flex justify-start flex-col flex-1 px-8 py-10 text-left rounded-t-md">
                {children}
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default NewMaterialModal;
