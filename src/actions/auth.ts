"use server"

import { AuthError } from "next-auth"
import { signIn, signOut } from "@/auth"

export type LoginFormState = { message?: string }

export async function login(
  _prev: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/admin",
    })
  } catch (error) {
    // signIn dispara o redirect por exceção; só o erro de credencial fica aqui.
    if (error instanceof AuthError) {
      return { message: "E-mail ou senha inválidos." }
    }
    throw error
  }

  return {}
}

export async function logout() {
  await signOut({ redirectTo: "/login" })
}
