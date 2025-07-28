const FooterItem = ({
  footerState,
}: {
  footerState: number;
}): React.ReactElement => {
  return (
    //fixed
    <footer className="fixed bottom-0 w-full rounded-t-3xl bg-gray-300 p-5">
      <div className="flex justify-center items-center text-gray-600 font-medium">
        <span>이득 총합&nbsp;</span>
        <span className="text-green-600 font-bold">
          {footerState.toLocaleString()}
        </span>
        원
      </div>
    </footer>
  );
};

export default FooterItem;
