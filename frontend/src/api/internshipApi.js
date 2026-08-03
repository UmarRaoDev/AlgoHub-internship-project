const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

// Public — no auth needed, used by the marketing Internship.jsx page
export async function getInternshipRequest() {
  const res = await fetch(`${API_BASE}/internship`);
  return handleResponse(res);
}

export async function updateInternshipRequest(internship, accessToken) {
  const res = await fetch(`${API_BASE}/internship`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(internship),
  });
  return handleResponse(res);
}