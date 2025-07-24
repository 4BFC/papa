"use client";

import ProviderState from "./context/ProviderState";
import HeaderTest from "@/features/secretary/header/Header.test";
import InputFormTest from "@/widgets/secretary/input/presentational/InputForm.test";
import "@/shared/lib/axios/axiosInterceptors";
import FooterTest from "@/widgets/secretary/footer/presentational/Footer.test";
import DataRowListContainerTest from "@/widgets/secretary/body/container/DataRowListContainer.test";

const SecretaryPage = (): React.ReactElement => {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const todayUTC = new Date().toISOString();
  return (
    <ProviderState>
      <HeaderTest today={today} />
      <InputFormTest />
      <DataRowListContainerTest todayUTC={todayUTC} />
      <FooterTest todayUTC={todayUTC} />
    </ProviderState>
  );
};

export default SecretaryPage;
