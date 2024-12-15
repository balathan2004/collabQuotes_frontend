import React, { useContext, useState, FC, ReactNode, useEffect } from "react";
import { CircularProgress } from "@mui/material";
export interface LoadingContextType {
  isLoading: loadingType;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = React.createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

interface Props {
  children: ReactNode;
}
export type loadingType = boolean;

const LoadingHolder: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<loadingType>(false);


  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 10000);
  
      // Cleanup the timeout if the component unmounts or `isLoading` changes
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);
  

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? <CircularProgress className="loader" /> : null}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

export default LoadingHolder;
