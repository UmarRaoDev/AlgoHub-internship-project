const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

// Public — published courses only, used by the marketing Courses.jsx page
export async function getPublishedCoursesRequest() {
  const res = await fetch(`${API_BASE}/courses`);
  return handleResponse(res);
}

// Admin — every course, published or draft, used by AdminCourses.jsx
export async function getAllCoursesAdminRequest(accessToken) {
  const res = await fetch(`${API_BASE}/courses/admin`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  return handleResponse(res);
}

export async function createCourseRequest(course, accessToken) {
  const res = await fetch(`${API_BASE}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(course),
  });
  return handleResponse(res);
}

export async function updateCourseRequest(id, course, accessToken) {
  const res = await fetch(`${API_BASE}/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(course),
  });
  return handleResponse(res);
}

export async function deleteCourseRequest(id, accessToken) {
  const res = await fetch(`${API_BASE}/courses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  return handleResponse(res);
}