import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

const BACKEND_URL = "http://127.0.0.1:8000/";

export async function fetchProjects(search: string, page: string) {
  noStore(); // Assuming this is a custom function you've defined elsewhere

  try {
    const response = await axios.get(`${BACKEND_URL}getprojects/`, {
      params: {
        page: encodeURIComponent(page),
        search: encodeURIComponent(search),
      },
    });
    let data = response.data; // Axios automatically handles the JSON parsing
    return data;
  } catch (e) {
    console.log("fetch users error:", e);
    throw new Error("Failed to fetch project data");
  }
}

/**
 * Fetch a single project and its corresponding comments
 * @param projectName
 * @returns { Project {}, Comments:[]}
 */
export async function fetchProject(owner: string, repo: string) {
  noStore(); // Assuming this is a custom function you've defined elsewhere

  try {
    const response = await axios.get(
      `${BACKEND_URL}projects/${owner}/${repo}`,
      {
        params: {
          // projectName: encodeURIComponent(projectName),
        },
      }
    );
    let data = response.data; // Axios automatically handles the JSON parsing
    return data;
  } catch (e) {
    console.log("fetch users error:", e);
    throw new Error("Failed to fetch project");
  }
}

/**
 * Fetch favourite projects associated with a user
 * @param username session
 * @returns
 */
export async function fetchFavourites(
  search: string,
  page: string,
  username: string
) {
  noStore(); // Assuming this is a custom function you've defined elsewhere

  try {
    const response = await axios.get(
      `${BACKEND_URL}getfavourites/${username}`,
      {
        params: {
          page: encodeURIComponent(page),
          search: encodeURIComponent(search),
        },
      }
    );
    let data = response.data; // Axios automatically handles the JSON parsing
    return data;
  } catch (e) {
    console.log("fetch users error:", e);
    throw new Error("Failed to fetch project");
  }
}

/**
 * Fetch user favourite projects and project info
 * @param username session
 * @returns
 */
export async function fetchUser(username: string) {
  noStore(); // Assuming this is a custom function you've defined elsewhere

  try {
    const response = await axios.get(`${BACKEND_URL}users/${username}`, {
      params: {},
    });
    let data = response.data; // Axios automatically handles the JSON parsing
    return data;
  } catch (e) {
    console.log("fetch users error:", e);
    throw new Error("Failed to fetch project");
  }
}

/**
 * Liking a project
 */
export async function likeProject(repo_url: string, username: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}likeproject/`, {
      repo_url: repo_url,
      username: encodeURIComponent(username),
    });
    let data = response.data; // Axios automatically handles the JSON parsing
    return data;
  } catch (e) {
    console.log("fetch users error:", e);
    throw new Error("Failed to fetch project");
  }
}

/**
 * Adding a comment
 */
export async function addComment(
  repo_url: string,
  username: string,
  text: string,
  avatar: string
) {
  try {
    const response = await axios.post(`${BACKEND_URL}addcomment/`, {
      repo_url: repo_url,
      username: encodeURIComponent(username),
      text: text,
      avatar: avatar,
    });
    let data = response.data; // Axios automatically handles the JSON parsing
    return data;
  } catch (e) {
    console.log("add comments error:", e);
    throw new Error("Failed to add comment");
  }
}
