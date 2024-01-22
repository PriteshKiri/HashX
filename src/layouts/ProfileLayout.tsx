import { useContext, useEffect, useState } from "react";
import { LogOutContext, SetLogOutContext } from "../Layout";
import Loader from "../components/util/Loader";
import { copyToClipboard, useSnackbar } from "../util";
import SnackBar from "../components/util/SnackBar";

const ProfileLayout = () => {
  const [inputKey, setInputKey]: any = useState("");
  const [fetchMode, setFetchMode] = useState(false);
  const [userDetails, setUserDetails]: any = useState({});
  const logout: any = useContext(LogOutContext);
  const setLogOut: any = useContext(SetLogOutContext);
  const { snackbar, showSnackbar }: any = useSnackbar();

  return <h1 className="hx-h1">hello profile</h1>;
};

export default ProfileLayout;
