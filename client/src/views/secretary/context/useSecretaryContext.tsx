import { SecretaryContextType } from "@/shared/types/secretary/contextType";
import { SecretaryContext } from "./ProviderState";
import { useContext } from "react";

const useSecretaryContext = (): SecretaryContextType => {
  const context = useContext(SecretaryContext);
  if (!context) {
    throw new Error("useContext must be used a ProviderState");
  }

  return context;
};

export default useSecretaryContext;
