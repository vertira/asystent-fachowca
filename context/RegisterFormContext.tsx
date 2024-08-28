"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type RegisterFormContextType = {
	registerModalVisible: boolean;
	setRegisterModalVisible: (state: boolean) => void;
};

const RegisterFormContext = createContext<RegisterFormContextType | undefined>(
	undefined
);

export function RegisterFormProvider({ children }: { children: ReactNode }) {
	const [registerModalVisible, setRegisterModalVisible] = useState(false);

	return (
		<RegisterFormContext.Provider
			value={{ registerModalVisible, setRegisterModalVisible }}
		>
			{children}
		</RegisterFormContext.Provider>
	);
}

export function useRegisterForm(): RegisterFormContextType {
	const context = useContext(RegisterFormContext);
	if (context === undefined) {
		throw new Error(
			"useRegisterForm must be used within a RegisterFormProvider"
		);
	}
	return context;
}
