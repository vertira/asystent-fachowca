import { Button } from "../ui/button"

const SignInButton = ({ handleButtonAuth }: any) => {
    return (
        <Button
            onClick={handleButtonAuth}
            className="rounded-sm border border-blue-500 p-2 text-center text-black hover:scale-105"
        >
            Logowanie
        </Button>
    )
}

export default SignInButton
