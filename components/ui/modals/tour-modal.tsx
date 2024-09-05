import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect } from "react"
import { X } from "lucide-react"
import { useLoginForm } from "@/context/LoginFormContext"

interface ModalProps {
    visible: boolean
    setVisible: (state: boolean) => void
    children: React.ReactNode
}

const TourModal: React.FC<ModalProps> = ({ visible, setVisible, children }) => {
    const { setIsTourActive } = useLoginForm()
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [visible])
    return (
        <Transition show={visible} as={Fragment}>
            <Dialog
                onClose={() => {
                    setVisible(false)
                    setIsTourActive(false)
                }}
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
                    <div className="fixed inset-0 z-50 flex h-full items-center justify-center">
                        <Dialog.Panel className="relative mt-auto flex h-full w-full rounded-sm shadow-md max-md:overflow-y-scroll sm:mt-0 md:w-4/5 xl:h-[90vh] xl:w-1/2">
                            <div className="fixed left-0 top-0 -z-10 h-full w-full flex-1 bg-cardBackground/95 md:absolute md:rounded-lg"></div>
                            <div className="glassPattern3 fixed left-0 top-0 h-full w-full rotate-180 md:absolute md:rounded-lg"></div>
                            <div className="absolute right-0 top-0 mr-4 mt-4">
                                <button
                                    onClick={() => {
                                        setVisible(false)
                                        setIsTourActive(false)
                                    }}
                                    className="hover:opacity-70 focus:outline-none"
                                >
                                    <X className="h-8 w-8" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="flex flex-1 flex-col justify-start rounded-t-md px-8 py-10 text-left">
                                {children}
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

export default TourModal
