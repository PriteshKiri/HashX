import React, { createContext, useEffect, useState } from "react";
import Tooltip from "./components/util/Tooltip";
import { useSnackbar } from "./util";
import SnackBar from "./components/util/SnackBar";
const TabContext = createContext<string | undefined>(undefined);
const PATContext = createContext<string | undefined>(undefined);
const LogOutContext = createContext<boolean | undefined>(undefined);
const SideBarStatusContext = createContext<boolean | undefined>(undefined);
const SetLogOutContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined);
const SetPATContext = createContext<
  React.Dispatch<React.SetStateAction<string>> | undefined
>(undefined);
declare global {
  interface Window {
    chrome: any;
  }
}

const Layout = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("profile");
  const [logout, setLogout] = useState<boolean | any>(false);
  const [globalPAT, setGlobalPAT] = useState<string | any>(false);
  const { snackbar, showSnackbar }: any = useSnackbar();
  const openSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      if (!username) {
        setLogout(true);
      } else {
        setGlobalPAT(username);
        setLogout(false);
      }
    });
  }, []);
  return (
    <div className={`app hx-layout `}>
      {snackbar && <SnackBar message={snackbar.message} type={snackbar.type} />}

      <nav className={`hx-nav bdr-all`}>
        {/* Sidebar opener arrow */}
        <div
          style={{
            padding: "4px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          className=" bdr-all mycenter"
          onClick={() => openSidebar()}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-left "
              style={{
                height: "20px",
                transform: "rotate(180deg)",
                transition: "all",
                width: "20px",
              }}
              width="22"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="11" y2="18" />
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-left "
              style={{
                height: "20px",
                transition: "all",
                width: "20px",
              }}
              width="22"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="11" y2="18" />
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
          )}
        </div>

        {/* Profile */}

        <Tooltip content="Profile">
          <div
            style={{
              padding: "4px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            className={`mycenter bdr-all ${
              tab === "profile" ? "nav-btn-gradient " : "nav-btn-gradient-hover"
            } `}
            onClick={() => setTab("profile")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user"
              style={{
                height: "20px",
                width: "20px",
              }}
              width="22"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </div>
        </Tooltip>
        <Tooltip content="Feeds">
          {/* Feed */}
          <div
            style={{
              padding: "4px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            className={`mycenter bdr-all ${
              tab === "feed" ? "nav-btn-gradient " : "nav-btn-gradient-hover"
            } `}
            onClick={() => setTab("feed")}
          >
            <svg
              style={{
                height: "20px",
                width: "20px",
              }}
              width="22"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M18.15 7.85V5a2.75 2.75 0 0 0-2.75-2.75H5A2.75 2.75 0 0 0 2.25 5v12A4.75 4.75 0 0 0 7 21.75h12.2a2.55 2.55 0 0 0 2.55-2.55v-9.1a2.25 2.25 0 0 0-2.25-2.25h-1.35Zm1.05 12.4c.58 0 1.05-.47 1.05-1.05v-9.1a.75.75 0 0 0-.75-.75h-1.35v9.85c0 .58.47 1.05 1.05 1.05ZM7.95 6.75a.75.75 0 1 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0 4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0 4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </Tooltip>
        <Tooltip content="Bookmarks">
          {/* Feed */}
          <div
            style={{
              padding: "4px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            className={`mycenter bdr-all ${
              tab === "bookmark"
                ? "nav-btn-gradient "
                : "nav-btn-gradient-hover"
            } `}
            onClick={() => setTab("bookmark")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-bookmarks"
              style={{
                height: "20px",
                width: "20px",
              }}
              width="22"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 10v11l-5 -3l-5 3v-11a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3z" />
              <path d="M11 3h5a3 3 0 0 1 3 3v11" />
            </svg>
          </div>
        </Tooltip>
        <Tooltip content="Search User">
          {/* Feed */}
          <div
            style={{
              padding: "4px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            className={`mycenter bdr-all ${
              tab === "search" ? "nav-btn-gradient " : "nav-btn-gradient-hover"
            } `}
            onClick={() => setTab("search")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user-search"
              style={{
                height: "20px",
                width: "20px",
              }}
              width="22"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h1.5" />
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M20.2 20.2l1.8 1.8" />
            </svg>
          </div>
        </Tooltip>
        <Tooltip content="The Commit Podcast">
          <div
            style={{
              padding: "4px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            className={`mycenter bdr-all  "nav-btn-gradient-hover"
             `}
            onClick={() => {
              setTab("podcast");
              window.open(
                "https://podcasters.spotify.com/pod/show/the-commit",
                "_blank"
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-spotify"
              style={{
                height: "20px",
                width: "20px",
              }}
              width="22"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
              <path d="M9 15c1.5 -1 4 -1 5 .5" />
              <path d="M7 9c2 -1 6 -2 10 .5" />
            </svg>
          </div>
        </Tooltip>
      </nav>
      <div
        className={"bdr-l"}
        style={{
          backgroundColor: "black",
          transition: "width 0.2s ease-in-out",
          width: open ? "400px" : "0px",
        }}
      >
        {/* Header */}
        <div
          style={{
            height: "50px",
            width: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="bdr-b"
        >
          <img
            src="https://res.cloudinary.com/ddlhk5yje/image/upload/v1705917787/hashx/hashx_bkm3wo.png"
            alt="HashX header logo"
            style={{
              height: "40px",
              paddingLeft: "12px",
            }}
          />

          <Tooltip content="Logout">
            <div
              style={{
                paddingRight: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                setGlobalPAT("");
                if (window.chrome) {
                  window.chrome.storage.local.set({ username: "" }).then(() => {
                    console.log("value is removed");
                    setLogout(true);
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user"
                style={{
                  width: "24px",
                  height: "24px",
                }}
                width="22"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M7 12h14l-3 -3m0 6l3 -3" />
              </svg>
            </div>
          </Tooltip>
        </div>
        <SideBarStatusContext.Provider value={open}>
          <SetLogOutContext.Provider value={setLogout}>
            <LogOutContext.Provider value={logout}>
              <SetPATContext.Provider value={setGlobalPAT}>
                <PATContext.Provider value={globalPAT}>
                  <TabContext.Provider value={tab}>
                    {children}
                  </TabContext.Provider>
                </PATContext.Provider>
              </SetPATContext.Provider>
            </LogOutContext.Provider>
          </SetLogOutContext.Provider>
        </SideBarStatusContext.Provider>

        {/* footer */}
        {open && (
          <div
            style={{
              height: "30px",
              width: "400px",
              color: "white",
              position: "absolute",
              bottom: "0",
              right: "0",
              backgroundColor: "black",
            }}
            className="mycenter bdr-t"
          >
            <small style={{ fontSize: "11px" }}>
              Made with &lt; 🧠 /&gt; by{" "}
              <a
                href="https://twitter.com/PriteshKiri"
                style={{
                  color: "white",
                }}
              >
                Pritesh Kiri
              </a>
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export {
  Layout,
  TabContext,
  LogOutContext,
  SetLogOutContext,
  SideBarStatusContext,
  PATContext,
  SetPATContext,
};
