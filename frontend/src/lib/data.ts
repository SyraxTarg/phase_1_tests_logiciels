"use server";

import { fetchData } from "@/src/lib/actions";

export async function getAllUsers() {
  try {
    const data = await fetchData(
      `/users/`,
      "GET",
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return [];
  }
}