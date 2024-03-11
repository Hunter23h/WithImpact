"use client";
/**
 * global context to share any client-side state
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";


interface ContextProps {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  projects: any[];
  setProjects: any;
}

const GlobalContext = createContext<any>({
  user: {},
  setUser: () => {},
  projects: [],
  setProjects: () => {},
  showFilters: false,
  setShowFilters: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        projects,
        setProjects,
        showFilters,
        setShowFilters,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
