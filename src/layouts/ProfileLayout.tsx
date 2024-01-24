import { useContext, useEffect, useState, useRef, FormEvent } from "react";
import { LogOutContext, SetLogOutContext } from "../Layout";
import Loader from "../components/util/Loader";
import { copyToClipboard, useSnackbar } from "../util";
import SnackBar from "../components/util/SnackBar";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import SocialMediaLinks from "../components/SocialMediaLinks";

const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
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
      publications(first: 5) {
        edges {
          node {
            title
            posts(first: 5) {
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
      posts(pageSize: 5, page: 5) {
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
  user: UserData;
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

interface UserQueryVars {
  username: string;
}

declare global {
  interface Window {
    chrome: any;
  }
}

const ProfileLayout = () => {
  const logout: any = useContext(LogOutContext);
  const setLogOut: any = useContext(SetLogOutContext);

  const usernameRef = useRef<HTMLInputElement>(null);
  const [getUser, { loading, error, data }] = useLazyQuery<
    UserQueryData,
    UserQueryVars
  >(GET_USER);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newUsername = usernameRef.current?.value;
    if (newUsername) {
      if (window.chrome) {
        window.chrome.storage.local.set({ username: newUsername }).then(() => {
          console.log("value is set");
          getUser({ variables: { username: newUsername } });
          setLogOut(false);
        });
      }
    }
  };

  console.log(logout);

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      if (username) {
        getUser({ variables: { username } });
        setLogOut(false);
      }
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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
      {logout ? (
<div>
<div
            style={{
              height: "120px",
              width: "120px",
              margin: "auto",
              borderRadius: "50%",
              backgroundImage: `url(${data?.user?.profilePicture})`,
              backgroundSize: "cover",
              marginTop: "15px",
            }}
          ></div>
<form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Enter username"
            style={{ marginRight: "10px", color: "black" }}
          />
          <button
            type="submit"
            style={{ padding: "5px 10px", background: "white", color: "black" }}
          >
            Submit
          </button>
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
              backgroundImage: `url(${data?.user?.profilePicture})`,
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
            {data?.user?.name}
          </h1>
          <p className="hx-p" style={{ textAlign: "center" }}>
            {data?.user?.tagline}
          </p>
          <div style={{ display: "flex", gap: 25, justifyContent: "center" }}>
            <p>
              <span style={{ fontWeight: 600 }}>
                {data?.user?.followersCount}
              </span>{" "}
              Followers
            </p>
            <p>
              <span style={{ fontWeight: 600 }}>
                {data?.user?.followingsCount}
              </span>{" "}
              Following
            </p>
          </div>
          <SocialMediaLinks
            website={data?.user?.socialMediaLinks?.website}
            github={data?.user?.socialMediaLinks?.github}
            twitter={data?.user?.socialMediaLinks?.twitter}
            instagram={data?.user?.socialMediaLinks?.instagram}
            facebook={data?.user?.socialMediaLinks?.facebook}
            stackoverflow={data?.user?.socialMediaLinks?.stackoverflow}
            linkedin={data?.user?.socialMediaLinks?.linkedin}
            youtube={data?.user?.socialMediaLinks?.youtube}
          />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {Boolean(data?.user?.posts?.edges?.length) &&
              data?.user?.posts?.edges?.map((post) => {
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
            {Boolean(data?.user?.publications?.edges.length) &&
              data?.user?.publications?.edges
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
