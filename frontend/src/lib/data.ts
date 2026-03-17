"use server";

import { fetchData } from "@/src/lib/actions";
import { Card, Message, Transaction, User } from "./definitions";

export async function getAllUsers() {
  try {
    const data: User[] = await fetchData(`/users/`, "GET");
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return [];
  }
}

export async function getCardsByUserId(id: number) {
  try {
    const data: Card[] = await fetchData(`/cards/${id}`, "GET");
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return [];
  }
}

export async function getUserById(id: number) {
  try {
    const data: User = await fetchData(`/users/${id}`, "GET");
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

export async function getTransactionsByReceiver(id: number) {
  try {
    const data: Transaction[] = await fetchData(
      `/transactions/receiver/${id}`,
      "GET",
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return [];
  }
}

export async function getTransactionById(id: number) {
  try {
    const data: Transaction = await fetchData(`/transactions/${id}`, "GET");
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return null;
  }
}

export async function getMessagesByTransaction(id: number) {
  try {
    const data: Message[] = await fetchData(`/messages/${id}`, "GET");
    return data;
  } catch (error) {
    console.error("Failed to fetch :", error);
    return null;
  }
}
