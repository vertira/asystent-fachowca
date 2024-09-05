import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { signIn } from "next-auth/react";
import LoginForm from "../login-form";
import { Button } from "../ui/button";
import { useLoginForm } from "@/context/LoginFormContext";
import { DemoAccount } from "../demo-account-card";

const AuthContent = ({ handleButtonRegister, setAuthModalVisible }: any) => {
  const { isTourActive } = useLoginForm();
  return (
    <div className="flex items-center justify-center flex-col">
      <Image
        src={"/logo/small-logo.png"}
        alt="logo"
        width={150}
        height={150}
        className="p-10"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-2xl font-semibold pb-4 text-myText ">
          Witaj w świecie Twoich projektów! 🏠✨
        </div>
        <div className="text-sm md:text-base text-myText-muted w-full max-w-md pb-10 mx-auto">
          <p className="max-w-lg mx-auto text-balance text-centerw">
            <span>Otwórz drzwi do swoich budowlanych marzeń.</span>
            <br />
            Tutaj każdy remont to nowa przygoda, a każda naprawa to krok w
            stronę doskonałości.
          </p>
        </div>
      </div>
      {isTourActive && (
        <div className="flex flex-col md:flex-row w-full justify-around gap-4 mb-6">
          <DemoAccount account="Konto Boss" role="boss" contentNum={0} />
          <DemoAccount account="Konto Staff" role="staff" contentNum={1} />
        </div>
      )}
      <LoginForm setAuthModalVisible={setAuthModalVisible} />
      {!isTourActive && (
        <>
          <Button
            variant="ghostsecond"
            onClick={() => signIn("discord", { redirect: false })}
            className="flex items-center justify-center gap-4 w-full max-w-xs mt-4"
          >
            <FaDiscord className="text-xl" />
            Logowanie przez Discord
          </Button>
          <p className="text-xs text-center mt-3">
            Nie masz konta? Przejdź do{" "}
            <span
              className="underline hover:cursor-pointer hover:text-first-muted transition-all"
              onClick={handleButtonRegister}
            >
              rejestracji
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthContent;
