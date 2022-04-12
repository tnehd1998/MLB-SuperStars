import React, { useEffect, useState } from "react";
import { isLikePlayer } from "../lib/like";
import GoBackButton from "./GoBackButton";
import LayoutHeader from "./LayoutHeader";
import LayoutMenu from "./LayoutMenu";
import LayoutMenus from "./LayoutMenus";
import LikeButton from "./LikeButton";
import RemoveAllButton from "./RemoveAllButton";

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
  }, []);

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
