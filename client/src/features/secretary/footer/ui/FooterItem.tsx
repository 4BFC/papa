const FooterItem = ({
  footerState,
}: {
  footerState: number;
}): React.ReactElement => {
  return (
    <footer className="fixed bottom-0 flex w-full rounded-t-3xl bg-gray-300 justify-center items-center p-5 text-gray-600 font-medium">
      <span>이득 총합&nbsp;</span>
      <span className="text-green-600 font-bold">
        {footerState.toLocaleString()}
      </span>
      원
    </footer>
  );
};

export default FooterItem;
