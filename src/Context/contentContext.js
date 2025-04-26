import { createContext, useEffect, useState } from "react";
import allfolders from "../Utils/Common/allfolders";

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [idfolder, setidfolder] = useState({});

  useEffect(() => {
    // Only fetch if id exists and is different from what's already set
    if (idfolder?.id) {
      fetchFolders(idfolder.id);
    }     
  }, [idfolder?.id]);

  const fetchFolders = async (id) => {
    try {
      const folder = await allfolders(id);
      setidfolder(folder);
    } catch (error) {
      console.error("Error fetching folder:", error);
    }
  };

  return (
    <ContentContext.Provider value={{ idfolder, setidfolder }}>
      {children}
    </ContentContext.Provider>
  );
};
