"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface ContextProps {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  projects: any[];
  setProjects: any;
}

const GlobalContext = createContext<ContextProps>({
  user: {},
  setUser: () => {},
  projects: [],
  setProjects: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   console.log("Here");
  //   const fetchData = async () => {
  //     const user = await fetch("http://127.0.0.1:8000/api/user-info");
  //     console.log(user);
  //   };
  //   fetchData();
  // }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, projects, setProjects }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
