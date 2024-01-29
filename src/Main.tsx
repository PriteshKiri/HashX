import { useContext, useEffect } from "react";
import ProfileLayout from "./layouts/ProfileLayout";
import {
  LogOutContext,
  SetLogOutContext,
  SideBarStatusContext,
  TabContext,
} from "./Layout";
import FeedLayout from "./layouts/FeedLayout";
import BookmarkLayout from "./layouts/BookmarkLayout";
import SearchLayout from "./layouts/SearchLayout";

const Main = (): any => {
  const tab: any = useContext(TabContext);
  const logout: any = useContext(LogOutContext);
  const setLogOut: any = useContext(SetLogOutContext);
  const open: any = useContext(SideBarStatusContext);
  useEffect(() => {
    if (!logout) {
      setLogOut(true);
    }
  }, []);

  if (logout && open) {
    return <ProfileLayout />;
  }

  if (tab === "profile") {
    return <ProfileLayout />;
  }
  if (tab === "feed") {
    return <FeedLayout />;
  }
  if (tab === "bookmark") {
    return <BookmarkLayout />;
  }
  if (tab === "search") {
    return <SearchLayout />;
  }
  if (tab === "podcast") {
    return <ProfileLayout />;
  }
};

export default Main;
