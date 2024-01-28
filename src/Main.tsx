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
  const navTabs = [
    "profile",
    "feed",
  ];



  // if (!localStorage.getItem("sxs_key") && open) {
  //   // console.log("nokey", localStorage.getItem("sxs_key"));
  //   if (navTabs.includes(tab)) {
  //     return <ProfileLayout />;
  //   }
  // }

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
    return <FeedLayout />;
  }


  // if (localStorage.getItem("sxs_key") !== "" && open) {
  //   // console.log("key is", localStorage.getItem("sxs_key"));

  // }
};

export default Main;
