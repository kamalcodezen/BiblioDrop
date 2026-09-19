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

/**
 * Scans a book cover image via Multimodal AI to extract title, author, category, fee, and synopsis
 */
export async function scanBookCover(imageBase64, mimeType = "image/jpeg") {
  const response = await fetch(`${baseUrl}/api/ai/scan-cover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageBase64, mimeType }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to scan book cover");
  }

  return response.json();
}

/**
 * Fetches AI reader decision insights ("Should I Read This?") for BookDetails page
 */
export async function fetchBookInsights({ title, author, category, description }) {
  const response = await fetch(`${baseUrl}/api/ai/book-insights`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author, category, description }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate book insights");
  }

  return response.json();
}

export async function searchBooksByMood(query) {
  const response = await fetch(`${baseUrl}/api/ai/semantic-search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to perform AI mood search");
  }

  return response.json();
}

