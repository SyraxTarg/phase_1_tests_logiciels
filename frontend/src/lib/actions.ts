"use server";

import { cookies } from "next/headers";
import { TransactionContent } from "./definitions";

export async function fetchData(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  body?: string,
) {
  try {
    const token = (await cookies()).get("access_token")?.value;

    const res = await fetch(`${process.env.API_URL}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    if (res.status === 204 || res.headers.get("Content-Length") === "0") {
      return null;
    }

    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }

    return await res.text();
  } catch (error) {
    throw new Error(`Fetch error: ${String(error)}`);
  }
}

export async function createNewTransaction(payload: TransactionContent) {
  try {
    await fetchData(
      `/transactions/`,
      "POST",
      JSON.stringify({
        proposerId: payload.proposerId,
        receiverId: payload.receiverId,
        proposerCardIds: payload.proposerCardIds,
        receiverCardIds: payload.receiverCardIds,
        messageContent: payload.messageContent,
      }),
    );
    return { ok: true };
  } catch (error) {
    throw new Error(`Fetch error: ${String(error)}`);
  }
}

export async function patchTransactionStatus(
  transactionId: number,
  status: string,
) {
  try {
    const response = await fetchData(
      `/transactions/${transactionId}`,
      "PATCH",
      JSON.stringify({ status }),
    );
    const transaction = await response.json();
    return { ok: true, transaction };
  } catch (error) {
    throw new Error(`Fetch error: ${String(error)}`);
  }
}

export async function sendMessage(transactionId: number, content: string) {
  try {
    await fetchData(
      `/messages/${transactionId}`,
      "POST",
      JSON.stringify({ content }),
    );
    return { ok: true };
  } catch (error) {
    throw new Error(`Fetch error: ${String(error)}`);
  }
}
