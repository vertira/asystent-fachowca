import MaterialForm from "./new-material-form";
const NewMaterial = ({ setVisible, data }: { setVisible: any; data: any }) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-2xl md:text-4xl font-extrabold pb-4 ">
          Dodawanie nowego materiału do magazynu
        </div>
        <div className="text-sm md:text-base text-myText-muted w-full md:w-3/4 pb-10 mx-auto">
          <p className="max-w-lg mx-auto text-balance text-center">
            <span className="text-nowrap">
              Witaj w kreatorze dodawania nowych produktów! 🎉
            </span>
            <br />
            Wprowadź niezbędne informacje, aby szybko i sprawnie zaktualizować
            stan magazynowy.{" "}
            <span className="text-nowrap">
              Twoja efektywność to nasz priorytet! 🚀
            </span>
          </p>
        </div>
      </div>
      <MaterialForm setVisible={setVisible} data={data} />
    </div>
  );
};

export default NewMaterial;
