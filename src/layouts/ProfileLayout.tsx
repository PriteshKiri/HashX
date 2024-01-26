import { useContext, useEffect, useState, useRef, FormEvent } from "react";
import { LogOutContext, SetLogOutContext, SetPATContext } from "../Layout";
import Loader from "../components/util/Loader";
import { copyToClipboard, useSnackbar } from "../util";
import SnackBar from "../components/util/SnackBar";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import SocialMediaLinks from "../components/SocialMediaLinks";

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
  const [pat, setPat] = useState("");
  const [fetchMode, setFetchMode] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const [getUser, { loading, error, data }] = useLazyQuery<UserQueryData>(
    GET_USER,
    {
      context: {
        headers: {
          Authorization: pat,
        },
      },
    }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newUsername = usernameRef.current?.value;
    setGlobalPAT(pat)
    if (pat) {
      if (window.chrome) {
        window.chrome.storage.local.set({ username: pat }).then(() => {
          console.log("value is set");
          getUser();
          setLogOut(false);
        });
      }
    }

    // if (pat) {
    //   if (window.chrome) {
    //     window.chrome.storage.local.set({ username: pat }).then(() => {
    //       console.log("value is set");
    //       getUser();
    //       setLogOut(false);
    //     });
    //   }
    // }
  };

  console.log(logout);

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      console.log(username);
      if (username) {
        setPat(username);
        setGlobalPAT(username)
        setTimeout(() => {
          getUser();
        }, 2000);
      } else {
        setLogOut(true);
      }
    });
  }, []);

  // useEffect(() => {
  //   window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
  //     console.log(username);

  //     if (!username) {
  //       setFetchMode(false);
  //     }
  //   });
  // }, [logout]);

  // useEffect(() => {

  //   if (fetchMode) {
  //     getUser();
  //   }
  // }, [fetchMode]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        height: "85vh",
        padding: "20px",
      }}
    >
      {logout || error ? (
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
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            World's first Hasnode eXtension
          </p>

          <form
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
                setPat(e.target.value);
              }}
              value={pat}
              type="text"
              placeholder="Enter hashnode username"
              className="hx-input"
            />
            <small
              style={{
                textAlign: "center",
                margin: "10px",
                fontSize: "10px",
                width: "85%",
              }}
            >
              For example here,{" "}
              <a className="hx-link" href="https://hashnode.com/@Pritesh16">
                https://hashnode.com/@Pritesh16
              </a>{" "}
              , the username is "Pritesh16"
            </small>
            <div
              className="mycenter"
              style={{
                gap: 15,
                marginTop: 15,
                justifyContent: "space-between",
              }}
            >
              <button
                className="hx-button"
                onClick={() => {
                  setPat("");
                }}
              >
                Clear
              </button>
              <button
                type="submit"
                className="hx-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: "120px",
              width: "120px",
              margin: "auto",
              borderRadius: "50%",
              backgroundImage: `url(${data?.me?.profilePicture})`,
              backgroundSize: "cover",
              marginTop: "15px",
            }}
          ></div>
          <h1
            style={{
              color: "white",
              margin: "auto",
              textAlign: "center",
              marginTop: "15px",
            }}
            className="hx-h1"
          >
            {data?.me?.name}
          </h1>
          <p className="hx-p" style={{ textAlign: "center" }}>
            {data?.me?.tagline}
          </p>
          <div style={{ display: "flex", gap: 25, justifyContent: "center" }}>
            <p>
              <span style={{ fontWeight: 600 }}>
                {data?.me?.followersCount}
              </span>{" "}
              {data?.me?.followersCount ? "Followers" : "loading..."}
            </p>
            <p>
              <span style={{ fontWeight: 600 }}>
                {data?.me?.followingsCount}
              </span>{" "}
              {data?.me?.followingsCount && "Following"}
            </p>
          </div>
          <SocialMediaLinks
            website={data?.me?.socialMediaLinks?.website}
            github={data?.me?.socialMediaLinks?.github}
            twitter={data?.me?.socialMediaLinks?.twitter}
            instagram={data?.me?.socialMediaLinks?.instagram}
            facebook={data?.me?.socialMediaLinks?.facebook}
            stackoverflow={data?.me?.socialMediaLinks?.stackoverflow}
            linkedin={data?.me?.socialMediaLinks?.linkedin}
            youtube={data?.me?.socialMediaLinks?.youtube}
          />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {Boolean(data?.me?.posts?.edges?.length) &&
              data?.me?.posts?.edges?.map((post) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px 10px",
                      borderRadius: "8px",
                    }}
                    className="bdr-all"
                  >
                    <p style={{ color: "#94a3b8", fontSize: "12px" }}>
                      {post?.node?.title}
                    </p>
                    <a
                      href={post?.node?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-external-link"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ffffff"
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
                );
              })}
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {Boolean(data?.me?.publications?.edges.length) &&
              data?.me?.publications?.edges
                ?.find((item) => item.node.title === "")
                ?.node.posts.edges.map((post) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "5px 10px",
                        borderRadius: "8px",
                      }}
                      className="bdr-all"
                    >
                      <p style={{ color: "#94a3b8", fontSize: "12px" }}>
                        {post?.node?.title}
                      </p>
                      <a
                        href={post?.node?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-external-link"
                          width="24"
                          height="24"
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
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLayout;
