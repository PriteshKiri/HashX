import { useContext, useEffect, useState, FormEvent } from "react";
import {
  LogOutContext,
  SetLogOutContext,
  SetPATContext,
  SideBarStatusContext,
} from "./Layout";
import Loader from "../components/util/Loader";
import Profile from "../components/Profile";
import Blog from "../components/Blog";
import { useSnackbar } from "../util";
import SnackBar from "../components/util/SnackBar";

declare global {
  interface Window {
    chrome: any;
  }
}

const ProfileLayout = () => {
  const logout: any = useContext(LogOutContext);
  const setLogOut: any = useContext(SetLogOutContext);
  const open: any = useContext(SideBarStatusContext);
  const setGlobalPAT: any = useContext(SetPATContext);
  const [userDetails, setUserDetails]: any = useState({});
  const [pat, setPAT] = useState<string>("");
  const [showBlog, setShowBlog] = useState(false);
  const [fetchMode, setFetchMode] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [checkCredentials, setCheckCredentials] = useState(false);
  const { snackbar, showSnackbar }: any = useSnackbar();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setGlobalPAT(pat);
    if (pat) {
      if (window.chrome) {
        window.chrome.storage.local.set({ username: pat }).then(() => {
          // console.log(pat, "value is set");
          setCheckCredentials(true);
          setFetchMode(true);
        });
      }
    }
  };

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      // console.log(username, "usererrfet");

      if (username) {
        setPAT(username);
        setGlobalPAT(username);
        setFetchMode(true);

      } else {
        setLogOut(true);
        setFetchMode(false);
      }
    });
  }, []);

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      // console.log(username, "usererrfet");
      if (username === "" || username === null || username === undefined) {
        setFetchMode(false);
      }
    });
  }, [logout]);

  const handleRead = (id: string) => {
    setBlogId(id);
    setShowBlog(true);
  };

  useEffect(() => {
    if (fetchMode) {
      const query = `
      {
        me {
          location
          profilePicture
          name
          followersCount
          followingsCount
          bio {
            text
          }
          tagline
          socialMediaLinks {
            website
            github
            twitter
            instagram
            facebook
            stackoverflow
            linkedin
            youtube
          }
          publications(first: 10) {
            edges {
              node {
                title
                posts(first: 20) {
                  edges {
                    node {
                      title
                      url
                      id
                      brief
                      publishedAt
                      coverImage {
                        url
                      }
                      reactionCount
                      views
                      readTimeInMinutes
                    }
                  }
                }
              }
            }
          }
          posts(pageSize: 10, page: 20) {
            edges {
              node {
                title
                url
                id
                brief
                publishedAt
                coverImage {
                  url
                }
                reactionCount
                views
                readTimeInMinutes
              }
            }
            nodes {
              title
            }
          }
        }
      }
    
      `;

      const endpoint = "https://gql.hashnode.com"; // Replace with your actual GraphQL API endpoint

      try {
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: pat, // Set your authorization token here
            // Any other headers your API requires
          },
          body: JSON.stringify({ query }),
        })
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            if (response?.errors?.length) {
              setLogOut(true);
              setFetchMode(false);
              setCheckCredentials(false);
              showSnackbar(`Incorrect Personal Access Token!`, 3, "error");
            } else {
              setLogOut(false);
              setUserDetails(response);
              setCheckCredentials(false);
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors, such as by setting an error state or showing an error message
      }
    }
  }, [fetchMode]);
  if (showBlog) {
    return (
      <div>
        <Blog setShowBlog={setShowBlog} id={blogId} />
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 0,
        }}
      >
        {" "}
        {!logout && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
            }}
            className="bdr-b"
          >
            <p style={{ fontWeight: "600", margin: "0px", fontSize: "14px",color:"white" }}>
              Profile
            </p>
          </div>
        )}
        {logout && open && (
          <div
            style={{ flexDirection: "column", height: "calc(100vh - 78px)" }}
            className="mycenter gradient-bg"
          >
            {snackbar && (
              <SnackBar
                message={snackbar.message}
                time={snackbar.duration}
                type={snackbar.type}
              />
            )}
            <img
            src="https://res.cloudinary.com/ddlhk5yje/image/upload/v1705917787/hashx/hashx_bkm3wo.png"
            alt="HashX logo"
              style={{
                height: "120px",
                width: "120px",
                margin: "11px auto",
                borderRadius: "50%",
                marginTop: "-75px",
              }}
            ></img>
            <h1
              className="hx-h1"
              style={{
                textAlign: "center",
                margin: "0px auto",
                color: "white",
              }}
            >
              HashX
            </h1>
            <p
              style={{
                textAlign: "center",
                color: "#94a3b8",
                marginTop: "5px",
                fontSize: "14px",
              }}
            >
              World's first Hashnode eXtension
            </p>
            <small
              style={{
                textAlign: "center",
                margin: "10px",
                fontSize: "10px",
                width: "85%",
                marginTop: "20px",
                color: "#b7b7b7",
              }}
            >
              Please enter your Personal Access token. Click{" "}
              <a
                className="hx-link"
                href="https://hashnode.com/settings/developer"
                target="__blank"
              >
                here
              </a>{" "}
              to generate.
            </small>
            <div
              style={{
                marginBottom: "20px",
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {checkCredentials ? (
                <p style={{ fontSize: "12px", fontWeight: "bold",color:"white" }}>
                  Checking your token. Please wait!
                </p>
              ) : (
                <>
                  {" "}
                  <input
                    onChange={(e) => {
                      setPAT(e.target.value);
                    }}
                    value={pat}
                    type="text"
                    placeholder="Enter Personal Access Token"
                    className="hx-input"
                  />
                  <div
                    className="mycenter"
                    style={{
                      gap: 15,
                      marginTop: 15,
                      justifyContent: "space-between",
                    }}
                  >
                    <button className="hx-button" onClick={() => setPAT("")}>
                      Clear
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                      className={`${
                        pat.trim() ? "hx-button" : "hx-button-disable"
                      }`}
                      disabled={pat.trim() ? false : true}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {!logout &&
          (Object.keys(userDetails)?.length !== 0 ? (
            <Profile data={userDetails?.data} handleRead={handleRead} />
          ) : (
            <Loader />
          ))}
      </div>
    );
  }
};

export default ProfileLayout;
