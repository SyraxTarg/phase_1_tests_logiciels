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

export async function getCardsByUserId(id: number) {
  try {
    const data = await fetchData(
      `/cards/${id}`,
      "GET",
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return [];
  }
}

export async function getUserById(id: number) {
  try {
    // const data = await fetchData(
    //   `/users/${id}`,
    //   "GET",
    // );
    return {username: "Alice"};
  } catch (error) {
    console.error("Failed to fetch :", error);
    return null;
  }
}