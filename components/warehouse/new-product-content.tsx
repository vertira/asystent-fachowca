import MaterialForm from "./new-material-form"
const NewMaterial = ({ setVisible, data }: { setVisible: any; data: any }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="pb-4 text-2xl font-extrabold md:text-4xl">
                    Dodawanie nowego materiału do magazynu
                </div>
                <div className="mx-auto w-full pb-10 text-sm text-myText-muted md:w-3/4 md:text-base">
                    <p className="mx-auto max-w-lg text-balance text-center">
                        <span className="text-nowrap">
                            Witaj w kreatorze dodawania nowych produktów! 🎉
                        </span>
                        <br />
                        Wprowadź niezbędne informacje, aby szybko i sprawnie
                        zaktualizować stan magazynowy.{" "}
                        <span className="text-nowrap">
                            Twoja efektywność to nasz priorytet! 🚀
                        </span>
                    </p>
                </div>
            </div>
            <MaterialForm setVisible={setVisible} data={data} />
        </div>
    )
}

export default NewMaterial
