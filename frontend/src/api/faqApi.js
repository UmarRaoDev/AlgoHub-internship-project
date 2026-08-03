const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

// Public — no auth needed, used by the marketing Faq.jsx page
export async function getFaqsRequest() {
  const res = await fetch(`${API_BASE}/faqs`);
  return handleResponse(res);
}

export async function createFaqRequest(faq, accessToken) {
  const res = await fetch(`${API_BASE}/faqs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(faq),
  });
  return handleResponse(res);
}

export async function updateFaqRequest(id, faq, accessToken) {
  const res = await fetch(`${API_BASE}/faqs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(faq),
  });
  return handleResponse(res);
}

export async function deleteFaqRequest(id, accessToken) {
  const res = await fetch(`${API_BASE}/faqs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  return handleResponse(res);
}