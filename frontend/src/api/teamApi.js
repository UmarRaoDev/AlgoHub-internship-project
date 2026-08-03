const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

// Public — no auth needed, used by the marketing Team.jsx page
export async function getTeamMembersRequest() {
  const res = await fetch(`${API_BASE}/team`);
  return handleResponse(res);
}

export async function createTeamMemberRequest(member, accessToken) {
  const res = await fetch(`${API_BASE}/team`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(member),
  });
  return handleResponse(res);
}

export async function updateTeamMemberRequest(id, member, accessToken) {
  const res = await fetch(`${API_BASE}/team/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(member),
  });
  return handleResponse(res);
}

export async function deleteTeamMemberRequest(id, accessToken) {
  const res = await fetch(`${API_BASE}/team/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  return handleResponse(res);
}