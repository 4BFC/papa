import { createContext } from "react";
import { SecretaryContextType } from "@/shared/types/secretary/contextType";

export const SecretaryContext = createContext({});

export default function ProviderState({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SecretaryContextType;
}): React.ReactElement {
  return (
    <SecretaryContext.Provider value={value}>
      {children}
    </SecretaryContext.Provider>
  );
}
