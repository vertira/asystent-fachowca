const SignUpButton = ({handleButtonRegister}:any) => {
	return (
		<button onClick={handleButtonRegister}
			className="
    bg-gradient-to-b from-blue-500 to-blue-400
    text-white
    text-center
     p-2 
     rounded-sm
     hover:scale-105
      
      "
		>
			Rejestracja
		</button>
	);
};

export default SignUpButton;
