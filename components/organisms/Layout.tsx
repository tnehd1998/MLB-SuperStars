import { isLikePlayer } from "lib/like";
import React, { useEffect, useState } from "react";
import LayoutHeader from "./LayoutHeader";
import LayoutMenus from "./LayoutMenus";

interface IProps {
  title: string;
  goBackBtn?: boolean;
  removeAll?: boolean;
  children: React.ReactNode;
}

const Layout = ({ title, goBackBtn, removeAll, children }: IProps) => {
  const [isLikedPlayer, setIsLikedPlayer] = useState(false);

  useEffect(() => {
    isLikePlayer(title) && setIsLikedPlayer(true);
  }, [title]);

  return (
    <div>
      <LayoutHeader
        goBackBtn={goBackBtn}
        isLikedPlayer={isLikedPlayer}
        title={title}
        setIsLikedPlayer={setIsLikedPlayer}
        removeAll={removeAll}
      />
      <main className="py-28">{children}</main>
      <LayoutMenus />
    </div>
  );
};

export default Layout;
