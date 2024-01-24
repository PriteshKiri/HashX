import React, { createContext, useEffect, useState } from "react";
import Tooltip from "./components/util/Tooltip";
import { useSnackbar } from "./util";
import SnackBar from "./components/util/SnackBar";
const TabContext = createContext<string | undefined>(undefined);
const LogOutContext = createContext<boolean | undefined>(undefined);
const SideBarStatusContext = createContext<boolean | undefined>(undefined);
const SetLogOutContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
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
  const { snackbar, showSnackbar }: any = useSnackbar();
  const openSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      if (!username) {
        setLogout(true);
      } else {
        setLogout(false);
      }
    });
  }, []);
  return (
    <div
      style={{
        fontFamily: "sans-serif", // Assuming 'hx-font-sans' sets a sans-serif font
        display: "flex",
        zIndex: 9999999,
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
      }}
      className={`app`}
    >
      {snackbar && <SnackBar message={snackbar.message} type={snackbar.type} />}

      <nav
        style={{
          position: "absolute",
          paddingTop: "10px",
          paddingBottom: "10px",
          top: "50px",
          left: "-50px", // Assuming '--left-[50px]' is a typo and should be 'left-50px'
          width: "50px",
          backgroundColor: "black",
          height: "220px",
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "4px",
        }}
      >
        {/* Sidebar opener arrow */}
        <div
          style={{
            padding: "4px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          className=" bdr-all mycenter "
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-left "
              style={{
                height: "20px",
                transform: "rotate(180deg)",
                transition: "all",
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
            className={`mycenter ${
              tab === "profile" ? "nav-btn-gradient " : "nav-btn-gradient-hover"
            } `}
            onClick={() => setTab("profile")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user"
              style={{
                height: "20px",
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
            className={`mycenter ${
              tab === "feed" ? "nav-btn-gradient " : "nav-btn-gradient-hover"
            } `}
            onClick={() => setTab("feed")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user"
              style={{
                height: "20px",
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
              <circle cx="5" cy="19" r="1" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <path d="M4 11a9 9 0 0 1 9 9" />
            </svg>
          </div>
        </Tooltip>
      </nav>
      <div
        className={"bdr-l"}
        style={{
          backgroundColor: "black",
          transition: "all",
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
            <p
              style={{
                paddingRight: "12px",
              }}
              onClick={() => {
                if (window.chrome) {
                  window.chrome.storage.local.set({ username: "" }).then(() => {
                    console.log("value is set");
                    // showSnackbar("Logged out successfully!", 3, "logout");
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
            </p>
          </Tooltip>
        </div>
        <SideBarStatusContext.Provider value={open}>
          <SetLogOutContext.Provider value={setLogout}>
            <LogOutContext.Provider value={logout}>
              <TabContext.Provider value={tab}>{children}</TabContext.Provider>
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
              // Add custom mycenter styles here
              paddingLeft: "12px",
              paddingRight: "12px",
              // Add custom bdr-t and bdr-l styles here
              position: "relative",
              bottom: "0",
              right: "0",
              backgroundColor: "black", // Note: This overrides the previous backgroundColor
            }}
            className="mycenter bdr-t bdr-l"
          >
            <small style={{ fontSize: "11px" }}>
              Made with &lt; 🧠 /&gt; by{" "}
              <a
                href="https://twitter.com/PriteshKiri"
                style={{
                  color: "white",
                  // Add custom hx-sxs-link styles here
                  // Implement hover effect with JavaScript or another method
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
};
