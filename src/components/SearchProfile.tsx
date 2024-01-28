import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import ProfileBlogCard from "./ProfileBlogCard";

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
            return <ProfileBlogCard item={post} />;
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
              return <ProfileBlogCard item={post} />;
            })}
      </div>
    </div>
  );
};

export default SearchProfile;
