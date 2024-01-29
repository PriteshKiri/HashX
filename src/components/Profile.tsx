import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import ProfileBlogCard from "./ProfileBlogCard";
import { formatFollowersNumber, useSnackbar } from "../util";
import SnackBar from "./util/SnackBar";

const Profile = ({ data, handleRead }: any) => {
  const { snackbar, showSnackbar }: any = useSnackbar();

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
      {snackbar && (
        <SnackBar
          message={snackbar.message}
          time={snackbar.duration}
          type={snackbar.type}
        />
      )}
      <div>
        <div
          style={{
            height: "140px",
            width: "140px",
            margin: "auto",
            borderRadius: "50%",
            backgroundImage: `url(${data?.me?.profilePicture})`,
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
          fontSize: "24px",
          fontWeight: "600px",
          textAlign: "center",
        }}
      >
        {data?.me?.name}
      </h1>
      <p className="hx-p" style={{ textAlign: "center", color: "#808080" }}>
        {data?.me?.tagline}
      </p>
      <div
        style={{
          display: "flex",
          gap: 25,
          justifyContent: "center",
          marginTop: "7px",
        }}
      >
        <p style={{ fontSize: "14px",display:"flex",justifyContent:"center",alignItems:"center",gap:"5px", }}>
          <span style={{ fontWeight: 600 }}>
            {formatFollowersNumber(data?.me?.followersCount)}
          </span>{" "}
          Followers
        </p>
        <p style={{ fontSize: "14px",display:"flex",justifyContent:"center",alignItems:"center",gap:"5px", }}>
          <span style={{ fontWeight: 600 }}>
            {formatFollowersNumber(data?.me?.followingsCount)}
          </span>{" "}
          Following
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
          marginBottom: "40px",
        }}
      >
        {Boolean(data?.me?.posts?.edges?.length) &&
          data?.me?.posts?.edges?.map((post: any) => {
            return (
              <ProfileBlogCard
                item={post}
                handleRead={handleRead}
                showSnackbar={showSnackbar}
              />
            );
          })}

        {Boolean(data?.me?.publications?.edges.length) &&
          data?.me?.publications?.edges
            ?.find((item: any) => item.node.title === "")
            ?.node.posts.edges.map((post: any) => {
              return (
                <ProfileBlogCard
                  item={post}
                  handleRead={handleRead}
                  showSnackbar={showSnackbar}
                />
              );
            })}

        {Boolean(data?.me?.publications?.edges.length) &&
          data?.me?.publications?.edges
            ?.filter((item: any) => item.node.title !== "")[0]
            ?.node.posts.edges.map((post: any) => {
              return (
                <ProfileBlogCard
                  item={post}
                  handleRead={handleRead}
                  showSnackbar={showSnackbar}
                />
              );
            })}

        {Boolean(data?.me?.publications?.edges.length) &&
          data?.me?.publications?.edges
            ?.filter((item: any) => item.node.title !== "")[1]
            ?.node.posts.edges.map((post: any) => {
              return (
                <ProfileBlogCard
                  item={post}
                  handleRead={handleRead}
                  showSnackbar={showSnackbar}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Profile;
