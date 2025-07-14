import useFooterState from "@/features/secretary/footer/model/useFooterState";
import FooterItem from "@/features/secretary/footer/ui/FooterItem";
import { LedgerModel } from "@/shared/types";

const Footer = ({
  data,
  todayUTC,
}: {
  data: LedgerModel[];
  todayUTC: string;
}): React.ReactElement => {
  return <FooterItem footerState={useFooterState(data, todayUTC)} />;
};

export default Footer;
