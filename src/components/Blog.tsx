import { useContext, useEffect, useState, useRef, FormEvent } from "react";
import { LogOutContext, SetLogOutContext } from "../Layout";
import Loader from "../components/util/Loader";
import { copyToClipboard, formatDate, useSnackbar } from "../util";
import SnackBar from "../components/util/SnackBar";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { relative } from "path";

const GET_BLOG = gql`
  query GetBlog($id: ID!) {
    post(id: $id) {
      title
      subtitle
      coverImage {
        url
      }
      url
      publishedAt
      readTimeInMinutes
      content {
        html
      }
      author {
        name
        profilePicture
        username
      }
    }
  }
`;

interface BlogProps {
  id: string;
  setShowBlog: (show: boolean) => void;
}

interface BlogData {
  post: {
    title: string;
    subtitle: string;
    url: string;
    publishedAt: string;
    coverImage: {
      url: string;
    };
    readTimeInMinutes: number;
    content: {
      html: string;
    };
    author: {
      name: string;
      profilePicture: string;
      username: string;
    };
  };
}

const Blog = ({ id, setShowBlog }: BlogProps) => {
  const [getBlog, { loading, error, data }] = useLazyQuery<
    BlogData,
    { id: string }
  >(GET_BLOG);

  useEffect(() => {
    getBlog({ variables: { id } });
  }, []);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          padding: 20,
          background: "black",
          top: 0,
        }}
        className="bdr-b bdr-l"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            cursor: "pointer",
          }}
          onClick={() => setShowBlog(false)}
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
          <p style={{ margin: 0 }}>Back</p>
        </div>

        <a href={data?.post?.url} target="_blank" rel="noopener noreferrer">
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

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          overflowY: "scroll",
          height: "77vh",
          position: "relative",
        }}
      >
        <div style={{ margin: "15px 0px" }}>
          <div
            style={{
              height: "185px",
              width: "100%",
              borderRadius: "8px",
              backgroundImage: `url(${data?.post?.coverImage?.url})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>

        <div>
          <h1 style={{ textAlign: "center", fontSize: 20, fontWeight: 600 }}>
            {data?.post?.title}
          </h1>
          <h2
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: 500,
              color: "#9b9b9b",
            }}
          >
            {data?.post?.subtitle}
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "50%",
              backgroundImage: `url(${data?.post?.author?.profilePicture})`,
              backgroundSize: "cover",
            }}
          ></div>
          <p style={{ margin: "0px", fontSize: "12px", fontWeight: "600" }}>
            {data?.post?.author?.name} ·{" "}
            <span style={{ fontWeight: 400 }}>
              {formatDate(data?.post?.publishedAt ?? "")}
            </span>{" "}
            ·{" "}
            <span style={{ fontWeight: 400 }}>
              {data?.post?.readTimeInMinutes} minutes
            </span>
          </p>
        </div>

        <div
          className="post-details"
          dangerouslySetInnerHTML={{ __html: data?.post?.content?.html || "" }}
        />
      </div>
    </div>
  );
};

export default Blog;
