"use server";

import { signIn } from "@/auth";
import {
  createPermisions,
  createUser,
  getRegistrationCode,
  getUser,
  getUserByEmail,
  markRegistrationCodeAsUsed,
  updateUserField,
  updateUserPermissions,
} from "./server-actions";
import { compare, hash } from "bcryptjs";
type Role = "EMPLOYER" | "STAFF";
export const register = async (prevState: any, formData: FormData) => {
  try {
    const firstName = formData.get("firstname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const registrationCode = formData.get("registrationCode") as string | null;

    if (!firstName || !email || !password) {
      return { error: "SERVER" };
    }

    const existingUser = await getUserByEmail(email.toLowerCase());
    if (existingUser) {
      return { error: "USER" };
    }

    const hashedPassword = await hash(password, 10);

    let role: Role = "EMPLOYER";
    let employerId = null;

    if (registrationCode) {
      const validCode = await getRegistrationCode(registrationCode);
      if (!validCode || validCode.used || validCode.expiresAt < new Date()) {
        return { error: "CODE" };
      }
      role = "STAFF";
      employerId = validCode.createdBy;
    }

    const newUser = await createUser(
      firstName,
      email.toLowerCase(),
      hashedPassword,
      role,
      employerId
    );

    if (role === "STAFF") {
      await createPermisions(newUser.id);
    }

    if (registrationCode) {
      await markRegistrationCodeAsUsed(registrationCode);
    }

    return { success: "SUCCESS" };
  } catch (e) {
    console.error(e);
    return { error: "SERVER" };
  }
};
export const login = async (prevState: any, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    return { success: "SUCCESS" };
  } catch (error) {
    return { success: "ERROR" };
  }
};
export const tourLogin = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      email,
      password,
    });
    return { success: "SUCCESS" };
  } catch (error) {
    return { success: "ERROR" };
  }
};
export const changePassword = async (prevState: any, formData: FormData) => {
  try {
    const oldPassword = formData.get("oldpassword") as string;
    const newPassword = formData.get("newpassword") as string;
    const newPasswordConfirm = formData.get("newpasswordconfirm") as string;

    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      return { error: "MISSING" };
    }
    if (oldPassword === newPassword) {
      return { error: "OLDNEWPASSWORD" };
    }
    const user = await getUser();
    const isMatched = await compare(oldPassword, user.password);
    if (!isMatched) {
      return { error: "!MATCHEDOLDPASS" };
    }
    if (newPassword !== newPasswordConfirm) {
      return { error: "!MATCHEDNEWPASS" };
    }
    const newHashedPassword = await hash(newPassword, 10);
    await updateUserField("password", newHashedPassword);
    return { success: "SUCCESS" };
  } catch (e) {
    console.error(e);
    return { error: "SERVER" };
  }
};
