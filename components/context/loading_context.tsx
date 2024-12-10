import React, { useContext, useState, FC, ReactNode } from "react";
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

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? <CircularProgress /> : null}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

export default LoadingHolder;
