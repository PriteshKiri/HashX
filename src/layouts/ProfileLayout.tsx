import { useContext, useEffect, useState, useRef, FormEvent } from "react";
import { LogOutContext, SetLogOutContext, SetPATContext } from "../Layout";
import Loader from "../components/util/Loader";
import { copyToClipboard, useSnackbar } from "../util";
import SnackBar from "../components/util/SnackBar";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import SocialMediaLinks from "../components/SocialMediaLinks";
import Profile from "../components/Profile";

const GET_USER = gql`
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
            posts(first: 10) {
              edges {
                node {
                  title
                  url
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
          }
        }
        nodes {
          title
        }
      }
    }
  }
`;

interface Post {
  title: string;
  url: string;
}

interface PostEdge {
  node: Post;
}

interface Posts {
  edges: PostEdge[];
}

interface Publication {
  title: string;
  posts: Posts;
}

interface PublicationEdge {
  node: Publication;
}

interface UserData {
  location: string;
  profilePicture: string;
  name: string;
  tagline: string;
  followersCount: number;
  followingsCount: number;
  bio: { text: string };
  socialMediaLinks: SocialMediaLinksProps;
  badges: Array<{ id: string; name: string }>;
  publications: {
    edges: PublicationEdge[];
  };
  posts: {
    edges: Array<{
      node: {
        title: string;
        url: string;
      };
    }>;
  };
}

interface UserQueryData {
  me: UserData;
}
interface SocialMediaLinksProps {
  website?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  stackoverflow?: string;
  linkedin?: string;
  youtube?: string;
}

declare global {
  interface Window {
    chrome: any;
  }
}

const ProfileLayout = () => {
  const logout: any = useContext(LogOutContext);
  const setLogOut: any = useContext(SetLogOutContext);
  const setGlobalPAT: any = useContext(SetPATContext);
  const [userDetails, setUserDetails]: any = useState({});
  const [pat, setPAT]: any = useState("");

  const [fetchMode, setFetchMode] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setGlobalPAT(pat);
    if (pat) {
      console.log(pat, "new user name");
      if (window.chrome) {
        window.chrome.storage.local.set({ username: pat }).then(() => {
          console.log(pat, "value is set");
          setFetchMode(true);
        });
      }
    }
  };

  console.log(logout);

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      console.log(username, "usererrfet");

      if (username !== "" || username !== null || username !== undefined) {
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
      console.log(username, "usererrfet");
      if (username === "" || username === null || username === undefined) {
        setFetchMode(false);
      }
    });
  }, [logout]);

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
                posts(first: 10) {
                  edges {
                    node {
                      title
                      url
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
    }
  }, [fetchMode]);

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
          <p style={{ fontWeight: "600", margin: "0px" }}>Profile</p>
        </div>
      )}
      {logout && (
        <div style={{ flexDirection: "column" }} className="mycenter">
          <div
            style={{
              height: "120px",
              width: "120px",
              margin: "auto",
              borderRadius: "50%",
              backgroundImage: `url("https://res.cloudinary.com/ddlhk5yje/image/upload/v1705917787/hashx/hashx_bkm3wo.png")`,
              backgroundSize: "cover",
              marginTop: "120px",
            }}
          ></div>
          <h1 className="hx-h1" style={{ textAlign: "center", margin: "auto" }}>
            HashX
          </h1>
          <p
            style={{ textAlign: "center", color: "#94a3b8", marginTop: "5px" }}
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
              <button className="hx-button">Clear</button>
              <button
                type="submit"
                className="hx-button"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {!logout &&
        (Object.keys(userDetails)?.length !== 0 ? (
          <Profile data={userDetails?.data} />
        ) : (
          <Loader />
        ))}
    </div>
  );
};

export default ProfileLayout;
