import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import ProfileBlogCard from "./ProfileBlogCard";

const SearchProfile = ({ data, handleRead }: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        height: "84vh",
        padding: "20px",
      }}
      className="gradient-bg-profile"
    >
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
            aspectRatio: "1/1",
          }}
        ></div>
      </div>
      <h1
        style={{
          color: "white",
          margin: "20px auto 0px",
        }}
        className="hx-h1"
      >
        {data?.user?.name}
      </h1>
      <p className="hx-p" style={{ textAlign: "center" }}>
        {data?.user?.tagline}
      </p>
      <div
        style={{
          display: "flex",
          gap: 25,
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <p>
          <span style={{ fontWeight: 600 }}>
            {data?.user?.followersCount || 0}
          </span>{" "}
          Followers
        </p>
        <p>
          <span style={{ fontWeight: 600 }}>
            {data?.user?.followingsCount || 0}
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
          marginBottom: "40px",
        }}
      >
        {Boolean(data?.user?.posts?.edges?.length) &&
          data?.user?.posts?.edges?.map((post: any) => {
            return <ProfileBlogCard item={post} handleRead={handleRead} />;
          })}

        {Boolean(data?.user?.publications?.edges.length) &&
          data?.user?.publications?.edges
            ?.find((item: any) => item.node.title === "")
            ?.node.posts.edges.map((post: any) => {
              return <ProfileBlogCard item={post} handleRead={handleRead} />;
            })}

        {Boolean(data?.user?.publications?.edges.length) &&
          data?.user?.publications?.edges
            ?.filter((item: any) => item.node.title !== "")[0]
            ?.node.posts.edges.map((post: any) => {
              return <ProfileBlogCard item={post} handleRead={handleRead} />;
            })}
        {Boolean(data?.user?.publications?.edges.length) &&
          data?.user?.publications?.edges
            ?.filter((item: any) => item.node.title !== "")[1]
            ?.node.posts.edges.map((post: any) => {
              return <ProfileBlogCard item={post} handleRead={handleRead} />;
            })}
      </div>
    </div>
  );
};

export default SearchProfile;
