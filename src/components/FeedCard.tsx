import React from "react";
import { copyToClipboard, formatDate } from "../util";

const FeedCard = ({
  item,
  handleRead,
  handleShowProfile,
  showSnackbar,
}: any) => {
  function handleCopyBlogLink() {
    copyToClipboard(item?.node?.url);
    showSnackbar("Blog link copied to clipboard!", 3, "clipboard");
  }

  return (
    <div
      className="bdr-all"
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#0f172a",
      }}
    >
      <img
        src={item?.node?.coverImage?.url}
        alt="cover of blog"
        style={{
          height: "170px",
          width: "100%",
          borderRadius: "8px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bdr-all"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          margin: "15px 0px",
          paddingBottom: "15px",
        }}
        className="bdr-b"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <img
            src={item?.node?.author?.profilePicture}
            alt="profile on hashnode"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
            }}
          ></img>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              gap: 2,
            }}
          >
            <p
              className=" hx-link-white"
              style={{ margin: "0px", fontSize: "12px", cursor: "pointer" }}
              onClick={() => handleShowProfile(item?.node?.author?.username)}
            >
              {item?.node?.author?.name}
            </p>
            <small
              style={{
                color: "rgb(148, 163, 184)",
                fontStyle: "italic",
                fontSize: "11px",
              }}
            >
              @{item?.node?.author?.username}
            </small>
          </div>
        </div>

        <p className="hx-p" style={{ color: "white" }}>
          {formatDate(item?.node?.publishedAt)}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          gap: 5,
          margin: "5px 0px",
        }}
      >
        <h3 className="hx-h3" style={{ margin: 0, color: "white" }}>
          {item?.node?.title}
        </h3>
        <p
          style={{
            margin: 0,
            color: "rgb(148, 163, 184)",
            fontSize: 10,
            lineHeight: "20px",
          }}
          dangerouslySetInnerHTML={{ __html: item?.node?.brief || "" }}
        ></p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          margin: "15px 0px 5px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-heart"
              style={{
                background: "#ff191938",
                borderRadius: "50%",
                padding: "3px",
                width: "20px",
                height: "20px",
                boxSizing: "border-box",
              }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ff4500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <small style={{ fontSize: "12px" }}>
              {item?.node?.reactionCount}
            </small>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-eye"
              style={{
                background: "#00abfb47",
                borderRadius: "50%",
                padding: "3px",
                width: "20px",
                height: "20px",
                boxSizing: "border-box",
              }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#00abfb"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
            </svg>
            <small style={{ fontSize: "12px" }}>{item?.node?.views}</small>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleCopyBlogLink}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-share-3"
              style={{
                background: "#730dff63",
                borderRadius: "50%",
                padding: "3px",
                width: "20px",
                height: "20px",
                boxSizing: "border-box",
              }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#a564ff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z" />
            </svg>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <button
            className="hx-button"
            style={{ padding: "5px 15px", backgroundColor: "#0064ff" }}
            onClick={() => handleRead(item?.node?.id)}
          >
            Read
          </button>
          <a
            href={item?.node?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mycenter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-external-link"
              style={{
                width: "18px",
                height: "18px",
              }}
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
    </div>
  );
};

export default FeedCard;
