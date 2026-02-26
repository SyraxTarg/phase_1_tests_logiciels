"use server";

import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

import { fetchData } from "@/src/lib/actions";

export async function saveAccessTokenInCookies(token: string) {
  (await cookies()).set({
    name: "access_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15mn
  });
}

export async function login(username: string, password: string) {
  try {
    const data = await fetchData(
      `/auth/login`,
      "POST",
      JSON.stringify({ username, password }),
    );
    await saveAccessTokenInCookies(data.token);
  } catch (error) {
    throw new Error(String(error));
  }
}