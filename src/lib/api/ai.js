/**
 * Client API utility for BiblioDrop AI Features
 * Communicates directly with BiblioDrop Express Server Backend
 */

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function sendChatMessage(message, history = []) {
  const response = await fetch(`${baseUrl}/api/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to communicate with AI");
  }

  return response.json();
}

