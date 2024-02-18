"use client";
import React from "react";
import Container from "../ui/container";
import { useEffect, useState } from "react";
import axios from "axios";
import crypto from "crypto";


// --------- only thing that seems to work :( ---------------
const Login = () => {
    const redirectToPage = () => {
        // Redirect to the desired page
        window.location.href = 'http://localhost:8000/accounts/github/login';
    };

    return (
        <div>
            <button onClick={redirectToPage} className="bg-red-200 my-3 rounded-lg w-[100%] p-2">
         Continue with GitHub
       </button>
        </div>
    );
};






// ---------------------- should work but the button does not (loads forever) -----------
// const Login = () => {
//   const [html, setHtml] = useState<any>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Redirect user to Django-Allauth GitHub login endpoint
//         const res = await axios.get(
//           "http://localhost:8000/accounts/github/login/"
//         );
//         console.log(res);
//         setHtml(res.data);
//       } catch (error) {
//         console.error("Login error:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return <div dangerouslySetInnerHTML={{ __html: html }} />;
// };




// -----------------almost works ---------------------------
// const Login = () => {
//   const [loading, setLoading] = useState(false);


//   const handleGitHubLogin = async () => {
//     try {
//       setLoading(true);
//       // Request GitHub authorization
//       // const state = generateRandomString(16);
//       const clientId = "1419a288038624c79a80"
//       // create a CSRF token and store it locally
//       const state = crypto.randomBytes(8).toString("hex");
//       // localStorage.setItem("latestCSRFToken", state);
    
// // redirect the user to github
//       // const link = `https://github.com/login/oauth/authorize?client_id=${clientId}&response_type=code&scope=repo&redirect_uri=${window.location.origin}/integrations/github/oauth2/callback&state=${state}`;
//       // window.location.assign(link);
//       const redirectUri = encodeURIComponent("http://localhost:8000/accounts/github/login/callback/"); // Callback URL after GitHub authentication
//       const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=&response_type=code&state=${state}`;
//       // const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&response_type=code&scope=&redirect_uri=${redirectUri}&state=${state}`;
//       console.log(authUrl)

//       // Open GitHub authentication window
//       window.location.href = authUrl;
//       // window.location.assign(authUrl);

      
//     } catch (error) {
//       console.error("GitHub login error:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGitHubLogin} disabled={loading} className="bg-red-200 my-3 rounded-lg w-[100%] p-2">
//         {loading ? "Loading..." : "Continue with GitHub"}
//       </button>
//     </div>
//   );
// };

export default Login;



