import { SecretaryContextType } from "@/shared/types/secretary/contextType";
import ProviderState from "./ProviderState";
import { useContext } from "react";

const useContext = (): SecretaryContextType => {
  const context = useContext(ProviderState);
  if (!context) {
    throw new Error("useContext must be used a ProviderState");
  }

  return context;
};

export default useContext;
