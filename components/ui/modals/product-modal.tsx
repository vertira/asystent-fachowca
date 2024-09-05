import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { X } from "lucide-react"

interface ModalProps {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

const ProductModal: React.FC<ModalProps> = ({
    visible,
    setVisible,
    children,
}) => {
    return (
        <Transition show={visible} as={Fragment}>
            <Dialog
                onClose={() => setVisible(false)}
                static={true}
                open={visible}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 backdrop-blur backdrop-filter transition-opacity"></div>
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
                        <Dialog.Panel className="relative flex h-full w-full max-w-[1300px] rounded-sm bg-white shadow-md xl:max-w-[1200px]">
                            <div className="absolute right-0 top-0 mr-4 mt-4">
                                <button
                                    onClick={() => setVisible(false)}
                                    className="hover:opacity-70 focus:outline-none"
                                >
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="flex flex-1 flex-col justify-center overflow-auto rounded-t-md px-8 py-10 text-left">
                                {children}
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

export default ProductModal
