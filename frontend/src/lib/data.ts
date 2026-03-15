"use server";

import { fetchData } from "@/src/lib/actions";
import { Transaction } from "./definitions";

export async function getAllUsers() {
  try {
    const data = await fetchData(`/users/`, "GET");
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return [];
  }
}

export async function getCardsByUserId(id: number) {
  try {
    const data = await fetchData(`/cards/${id}`, "GET");
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return [];
  }
}

export async function getUserById(id: number) {
  try {
    const data = await fetchData(`/users/${id}`, "GET");
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return null;
  }
}

export async function getTransactionsByProposer(id: number) {
  try {
    const data: Transaction[] = await fetchData(
      `/transactions/proposer/${id}`,
      "GET",
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return [];
  }
}
