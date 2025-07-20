"use client";

import ProviderState from "./context/ProviderState";
import HeaderTest from "@/features/secretary/header/Header.test";
import InputFormTest from "@/widgets/secretary/input/presentational/InputForm.test";
import "@/shared/lib/axios/axiosInterceptors";

const SecretaryPage = (): React.ReactElement => {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <ProviderState>
      <HeaderTest today={today} />
      <InputFormTest />
      <div>SecretaryPage</div>
    </ProviderState>
  );
};

export default SecretaryPage;
