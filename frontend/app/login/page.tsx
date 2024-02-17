"use client";
import React from "react";
import Container from "../ui/container";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [html, setHtml] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Redirect user to Django-Allauth GitHub login endpoint
        const res = await axios.get(
          "http://localhost:8000/accounts/github/login/"
        );
        console.log(res);
        setHtml(res.data);
      } catch (error) {
        console.error("Login error:", error);
      }
    };
    fetchData();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Login;
