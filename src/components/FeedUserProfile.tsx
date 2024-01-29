import { useContext, useEffect, useState, FormEvent } from "react";
import {
  LogOutContext,
  SetLogOutContext,
  SideBarStatusContext,
} from "../Layout";
import Profile from "../components/Profile";
import SearchProfile from "../components/SearchProfile";
import Blog from "../components/Blog";
import Loader from "./util/Loader";

declare global {
  interface Window {
    chrome: any;
  }
}

const FeedUserProfile = ({ username, setShowFeedUserProfile }: any) => {
  const setLogOut: any = useContext(SetLogOutContext);
  const [userDetails, setUserDetails]: any = useState({});
  const [fetchMode, setFetchMode] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [blogId, setBlogId] = useState("");
  const open: any = useContext(SideBarStatusContext);

  const handleRead = (id: string) => {
    setBlogId(id);
    setShowBlog(true);
  };

  //   useEffect(()=>{
  //     setFetchMode(true);
  // },[])
  useEffect(() => {
    const query = `
      {
        user(username: "${username}") {
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
                posts(first: 10) {
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
          posts(pageSize: 10, page: 10) {
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
        },
        body: JSON.stringify({ query }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response?.errors?.length) {
            setLogOut(true);
            setFetchMode(false);
          } else {
            setLogOut(false);
            setUserDetails(response);
          }
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors, such as by setting an error state or showing an error message
    }
  }, []);
  if (showBlog) {
    return (
      <div>
        <Blog setShowBlog={setShowBlog} id={blogId} />
      </div>
    );
  } else {
    return (
      open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 0,
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
              position: "relative",
            }}
            className="bdr-b bdr-l"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                width: "100%",
                background: "black",
                top: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setFetchMode(false);
                  setShowFeedUserProfile(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-left"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00abfb"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                  <path d="M5 12l6 6" />
                  <path d="M5 12l6 -6" />
                </svg>
                <p style={{ margin: 0,fontSize:"14px" }}>Back</p>
              </div>

              <a
                href={`https://hashnode.com/@${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-external-link"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#94a3b8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                  <path d="M11 13l9 -9" />
                  <path d="M15 4h5v5" />
                </svg>
              </a>
            </div>
          </div>
          {Object.keys(userDetails)?.length === 0 ? (
            <Loader />
          ) : (
            <SearchProfile data={userDetails?.data} handleRead={handleRead} />
          )}
        </div>
      )
    );
  }
};

export default FeedUserProfile;
