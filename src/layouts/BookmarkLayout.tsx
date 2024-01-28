import { useContext, useState } from "react";
import { gql } from "@apollo/client";
import Blog from "../components/Blog";
import { SetPATContext } from "../Layout";
import Personalized from "../components/feeds/Personalized";
import Following from "../components/feeds/Following";
import Featured from "../components/feeds/Featured";
import Bookmark from "../components/Bookmark";

// GraphQL query
const GET_FEED = gql`
  {
    feed(first: 20, filter: { type: BOOKMARKS }) {
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
          author {
            name
            profilePicture
            username
          }
        }
      }
    }
  }
`;

// TypeScript types for the query (Assuming structure, adjust as necessary)
interface UserQueryData {
  feed: {
    edges: Array<{
      node: {
        title: string;
        url: string;
        id: string;
        brief: string;
        publishedAt: string;
        coverImage: { url: string };
        reactionCount: number;
        views: number;
        author: {
          name: string;
          profilePicture: string;
          username: string;
        };
      };
    }>;
  };
}

const BookmarkLayout = () => {
  const [showBlog, setShowBlog] = useState(false);
  const [blogId, setBlogId] = useState("");

  const handleRead = (id: string) => {
    setBlogId(id);
    setShowBlog(true);
  };

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
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
          }}
          className="bdr-b"
        >
          <p style={{ fontWeight: "600", margin: "0px" }}>Bookmarks</p>
        </div>
        <Bookmark handleRead={handleRead} />
      </div>
    );
  }
};

export default BookmarkLayout;
