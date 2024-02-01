import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import ProfileBlogCard from "./ProfileBlogCard";
import { formatFollowersNumber, useSnackbar } from "../util";
import SnackBar from "./util/SnackBar";

const SearchProfile = ({ data, handleRead }: any) => {
  const { snackbar, showSnackbar }: any = useSnackbar();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        height: "calc(100vh - 172px)",
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
          src={data?.user?.profilePicture}
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
        {data?.user?.name}
      </h1>
      <p className="hx-p" style={{ textAlign: "center", color: "#808080" }}>
        {data?.user?.tagline}
      </p>
      <div
        style={{
          display: "flex",
          gap: 25,
          justifyContent: "center",
          marginTop: "7px",
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
            {formatFollowersNumber(data?.user?.followersCount || 0)}
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
            {formatFollowersNumber(data?.user?.followingsCount || 0)}
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
        }}
      >
        {Boolean(data?.user?.posts?.edges?.length) &&
          data?.user?.posts?.edges?.map((post: any) => {
            return (
              <ProfileBlogCard
                item={post}
                handleRead={handleRead}
                showSnackbar={showSnackbar}
              />
            );
          })}

        {Boolean(data?.user?.publications?.edges.length) &&
          data?.user?.publications?.edges
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

        {Boolean(data?.user?.publications?.edges.length) &&
          data?.user?.publications?.edges
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
        {Boolean(data?.user?.publications?.edges.length) &&
          data?.user?.publications?.edges
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

export default SearchProfile;
