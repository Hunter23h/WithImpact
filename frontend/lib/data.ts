import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

const BACKEND_URL = "http://127.0.0.1:8000/";

export async function fetchProjects(search: string, page: string, sort: string,
  sdg: string, languages: string, status: string, newcomer_friendly: string) {
  noStore(); // Assuming this is a custom function you've defined elsewhere


  try {
    const queryParams = new URLSearchParams({
    page: page,
    search: search,
    sort: sort,
    sdg: sdg, // Assuming sdg is not already encoded
    languages: languages,
    status: status,
    newcomer_friendly: newcomer_friendly,
  });

    console.log(queryParams)

    // Use fetch API to perform the request
    const response = await fetch(
      `${BACKEND_URL}getprojects/?${queryParams.toString()}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json(); // Manually parsing the JSON
    return data;
  } catch (e) {
    console.log("fetch projects error:", e);
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
    // Construct the URL with template literals to include the owner and repo in the path
    const url = `${BACKEND_URL}projects/${owner}/${repo}`;

    // Make the fetch request
    const response = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Parse the JSON from the response
    const data = await response.json();

    // Return the parsed data
    return data;
  } catch (e) {
    console.log("fetch project error:", e);
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
  sort: string,
  sdg: string, languages: string, status: string, newcomer_friendly: string,
  username: string
) {
  noStore(); // Assuming this is a custom function you've defined elsewhere

  try {
    // Construct the query parameters
    const queryParams = new URLSearchParams({
    page: page,
    search: search,
    sort: sort,
    sdg: sdg, // Assuming sdg is not already encoded
    languages: languages,
    status: status,
    newcomer_friendly: newcomer_friendly,
  });

    // Use fetch API to perform the request
    const response = await fetch(
      `${BACKEND_URL}getfavourites/${username}?${queryParams.toString()}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    // Parse the JSON response body
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("fetch users error:", e);
    throw e; // Rethrow the caught error or handle it as needed
  }
}

/**
 * Fetch user favourite projects and project info
 * @param username session
 * @returns
 */
export async function fetchUser(username: string) {
  noStore(); // Retain original side-effect function call

  try {
    // Use fetch API to perform the GET request
    const response = await fetch(`${BACKEND_URL}users/${username}`, {
      method: "GET", // GET is the default method, this line is optional
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    // Parse the JSON response body
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("fetch users error:", e);
    throw e; // Rethrow the caught error or handle it as needed
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

export async function submitUrl(url: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}submiturl/`, {
      url,
    });
    let data = response.data; // Axios automatically handles the JSON parsing
    return data;
  } catch (e) {
    console.log("add comments error:", e);
    throw new Error("Failed to add comment");
  }
}
