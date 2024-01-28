import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";

const SearchProfile = ({ data }: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        height: "79vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          height: "120px",
          width: "120px",
          margin: "auto",
          borderRadius: "50%",
          backgroundImage: `url(${data?.user?.profilePicture})`,
          backgroundSize: "cover",
          marginTop: "15px",
          padding: "100px 40px",
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
          <span style={{ fontWeight: 600 }}>{data?.user?.followersCount}</span>{" "}
          {data?.user?.followersCount ? "Followers" : "loading..."}
        </p>
        <p>
          <span style={{ fontWeight: 600 }}>{data?.user?.followingsCount}</span>{" "}
          {data?.user?.followingsCount && "Following"}
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
          data?.user?.posts?.edges?.map((post: any) => {
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
            ?.find((item: any) => item.node.title === "")
            ?.node.posts.edges.map((post: any) => {
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
                  <p
                    style={{ color: "#94a3b8", fontSize: "12px", width: "90%" }}
                  >
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
  );
};

export default SearchProfile;
