import { createContext } from "react";
import useSecretaryState from "@/features/secretary/model/useSecretaryState";
import useSecretaryFetch from "@/features/secretary/model/useSecretaryFetch";

export const SecretaryContext = createContext({});

const ProviderState = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const secretaryFetch = useSecretaryFetch();
  const secretaryState = useSecretaryState();

  const contextValue = {
    ...secretaryFetch,
    ...secretaryState,
  };

  return (
    <SecretaryContext.Provider value={contextValue}>
      {children}
    </SecretaryContext.Provider>
  );
};

export default ProviderState;
