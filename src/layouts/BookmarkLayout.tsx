import {  useState } from "react";
import Blog from "../components/Blog";

import Bookmark from "../components/Bookmark";
import FeedUserProfile from "../components/FeedUserProfile";



const BookmarkLayout = () => {
  const [showBlog, setShowBlog] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [showFeedUserProfile, setShowFeedUserProfile] = useState(false);
  const [feedUsername, setFeedUsername] = useState("");

  const handleRead = (id: string) => {
    setBlogId(id);
    setShowBlog(true);
  };
  const handleShowProfile = (username: string) => {
    setFeedUsername(username);
    setShowFeedUserProfile(true);
  };

  if (showBlog) {
    return (
      <div>
        <Blog setShowBlog={setShowBlog} id={blogId} />
      </div>
    );
  } else if (showFeedUserProfile) {
    return (
      <FeedUserProfile
        username={feedUsername}
        setShowFeedUserProfile={setShowFeedUserProfile}
      />
    );
  }
   else {
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
          <p style={{ fontWeight: "600", margin: "0px",color:"white" }}>Bookmarks</p>
        </div>
        <Bookmark handleRead={handleRead} handleShowProfile={handleShowProfile}  />
      </div>
    );
  }
};

export default BookmarkLayout;
