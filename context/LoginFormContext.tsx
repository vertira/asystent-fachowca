"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type LoginFormContextType = {
  loginModalVisible: boolean;
  setLoginModalVisible: (state: boolean) => void;
  isTourActive: boolean;
  setIsTourActive: (state: boolean) => void;
};

const LoginFormContext = createContext<LoginFormContextType | undefined>(
  undefined,
);

export function LoginFormProvider({ children }: { children: ReactNode }) {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  return (
    <LoginFormContext.Provider
      value={{
        loginModalVisible,
        setLoginModalVisible,
        isTourActive,
        setIsTourActive,
      }}
    >
      {children}
    </LoginFormContext.Provider>
  );
}

export function useLoginForm(): LoginFormContextType {
  const context = useContext(LoginFormContext);
  if (context === undefined) {
    throw new Error("useLoginForm must be used within a LoginFormProvider");
  }
  return context;
}
