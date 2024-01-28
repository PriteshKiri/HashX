import { useContext, useState } from "react";
import Blog from "../components/Blog";
import { SetPATContext, SideBarStatusContext } from "../Layout";
import Personalized from "../components/feeds/Personalized";
import Following from "../components/feeds/Following";
import Featured from "../components/feeds/Featured";

const FeedLayout = () => {
  const [showBlog, setShowBlog] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [tabType, setTabType] = useState("personalized");
  const open: any = useContext(SideBarStatusContext);

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
      open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "15px",
            }}
            className="bdr-b"
          >
            <div
              className={
                tabType === "personalized" ? "feeds-tab-active" : "feeds-tab"
              }
              onClick={() => setTabType("personalized")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-wand"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
                <path d="M15 6l3 3" />
                <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
              </svg>{" "}
              <p style={{ margin: 0 }}>Personalized</p>
            </div>
            <div
              className={
                tabType === "following" ? "feeds-tab-active" : "feeds-tab"
              }
              onClick={() => setTabType("following")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-users"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
              <p style={{ margin: 0 }}>Following</p>
            </div>
            <div
              className={
                tabType === "featured" ? "feeds-tab-active" : "feeds-tab"
              }
              onClick={() => setTabType("featured")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-star"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
              <p style={{ margin: 0 }}>Featured</p>
            </div>
          </div>
          {tabType === "personalized" ? (
            <Personalized handleRead={handleRead} />
          ) : tabType === "following" ? (
            <Following handleRead={handleRead} />
          ) : (
            <Featured handleRead={handleRead} />
          )}
        </div>
      )
    );
  }
};

export default FeedLayout;
