import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import ProfileBlogCard from "./ProfileBlogCard";

const Profile = ({ data }: any) => {
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
          backgroundImage: `url(${data?.me?.profilePicture})`,
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
        {data?.me?.name}
      </h1>
      <p className="hx-p" style={{ textAlign: "center" }}>
        {data?.me?.tagline}
      </p>
      <div style={{ display: "flex", gap: 25, justifyContent: "center" }}>
        <p>
          <span style={{ fontWeight: 600 }}>{data?.me?.followersCount}</span>{" "}
          {data?.me?.followersCount ? "Followers" : "loading..."}
        </p>
        <p>
          <span style={{ fontWeight: 600 }}>{data?.me?.followingsCount}</span>{" "}
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
          data?.me?.posts?.edges?.map((post: any) => {
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
            ?.find((item: any) => item.node.title === "")
            ?.node.posts.edges.map((post: any) => {
              return <ProfileBlogCard item={post} />;
            })}
      </div>
    </div>
  );
};

export default Profile;
