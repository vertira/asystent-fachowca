import { Button } from "../ui/button";

const SignInButton = ({ handleButtonAuth }: any) => {
	return (
		<Button
			onClick={handleButtonAuth}
			className="border border-blue-500
    text-black
    text-center
     p-2 
     rounded-sm
     hover:scale-105"
		>
			Logowanie
		</Button>
	);
};

export default SignInButton;
