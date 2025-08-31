import useFooterState from "@/features/secretary/footer/model/useFooterState.test";
import FooterItem from "@/features/secretary/footer/ui/FooterItem";

const Footer = ({ todayUTC }: { todayUTC: string }): React.ReactElement => {
  return <FooterItem footerState={useFooterState(todayUTC)} />;
};

export default Footer;
