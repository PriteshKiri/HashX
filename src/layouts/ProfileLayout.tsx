import { useContext, useEffect, useState, useRef, FormEvent } from "react";
import { LogOutContext, SetLogOutContext } from "../Layout";
import Loader from "../components/util/Loader";
import { copyToClipboard, useSnackbar } from "../util";
import SnackBar from "../components/util/SnackBar";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      location
      profilePicture
      name
      bio {
        text
      }
      socialMediaLinks {
        website
      }
      badges {
        id
        name
      }
      publications(first: 5) {
        edges {
          node {
            title
            displayTitle
            descriptionSEO
          }
          cursor
          role
        }
      }
      posts(pageSize: 10, page: 10) {
        edges {
          node {
            title
          }
        }
        nodes {
          title
        }
      }
    }
  }
`;

interface UserData {
  location: string;
  profilePicture: string;
  name: string;
  bio: { text: string };
  socialMediaLinks: { website: string };
  badges: Array<{ id: string; name: string }>;
  publications: {
    edges: Array<{
      node: {
        title: string;
        displayTitle: string;
        descriptionSEO: string;
      };
      cursor: string;
      role: string;
    }>;
  };
  posts: {
    edges: Array<{
      node: {
        title: string;
      };
    }>;
    nodes: Array<{ title: string }>;
  };
}

interface UserQueryData {
  user: UserData;
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
        });
      }
    }
  };

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      if (username) {
        getUser({ variables: { username } });
      }
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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

        <h1 style={{ color: "white" }}>HLLOO : {data?.user?.name}</h1>
        <img src={data?.user?.profilePicture} alt="" />

    </div>
  );
};

export default ProfileLayout;
