const SignUpButton = ({ handleButtonRegister }: any) => {
    return (
        <button
            onClick={handleButtonRegister}
            className="rounded-sm bg-gradient-to-b from-blue-500 to-blue-400 p-2 text-center text-white hover:scale-105"
        >
            Rejestracja
        </button>
    )
}

export default SignUpButton
