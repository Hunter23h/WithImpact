const BACKEND_URL = "http://127.0.0.1:8000/";

export async function fetchProjectsClient() {
  try {
    const res = await fetch(BACKEND_URL + "getprojects/");
    let data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log("fetch users error:", e);
    throw new Error("Failed to fetch project data");
  }
}
