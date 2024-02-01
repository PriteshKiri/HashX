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
        height: "calc(100svh - 170px)",
        padding: "20px",
        boxSizing: "content-box",
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
      <div className="mycenter">
        <img
          src={data?.me?.profilePicture}
          alt="Profile on hashnode"
          style={{
            height: "140px",
            width: "140px",
            margin: "auto",
            borderRadius: "50%",
            marginTop: "15px",
            aspectRatio: "1/1",
          }}
        />
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
      <p
        className="hx-p"
        style={{ textAlign: "center", color: "#808080", margin: "12px auto" }}
      >
        {data?.me?.tagline}
      </p>
      <div
        style={{
          display: "flex",
          gap: 25,
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            color: "white",
          }}
        >
          <span style={{ fontWeight: 600 }}>
            {formatFollowersNumber(data?.me?.followersCount)}
          </span>{" "}
          Followers
        </p>
        <p
          style={{
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            color: "white",
          }}
        >
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
