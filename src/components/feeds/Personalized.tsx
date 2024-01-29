import React, { useContext, useEffect, useState } from "react";
import { SetPATContext } from "../../Layout";
import FeedCard from "../FeedCard";
import Loader from "../util/Loader";
import { useSnackbar } from "../../util";
import SnackBar from "../util/SnackBar";

const Personalized = ({ handleRead, handleShowProfile }: any) => {
  const setGlobalPAT: any = useContext(SetPATContext);
  const [fetchMode, setFetchMode] = useState(false);
  const [pat, setPAT]: any = useState("");
  const [feedData, setFeedData]: any = useState({});
  const { snackbar, showSnackbar }: any = useSnackbar();

  useEffect(() => {
    window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
      console.log(username, "usererrfet");

      if (username !== "" || username !== null || username !== undefined) {
        setPAT(username);
        setGlobalPAT(username);
        setFetchMode(true);
      } else {
        setFetchMode(false);
      }
    });
  }, []);

  useEffect(() => {
    if (fetchMode) {
      const query = `
          {
            feed(first: 40, filter: { type: PERSONALIZED }) {
              edges {
                node {
                  title
                  url
                  id
                  brief
                  publishedAt
                  coverImage {
                    url
                  }
                  reactionCount
                  views
                  author {
                    name
                    profilePicture
                    username
                  }
                }
              }
            }
          }
          `;

      const endpoint = "https://gql.hashnode.com"; // Replace with your actual GraphQL API endpoint

      try {
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: pat, // Set your authorization token here
            // Any other headers your API requires
          },
          body: JSON.stringify({ query }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            if (response?.errors?.length) {
              setFetchMode(false);
            } else {
              setFeedData(response);
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors, such as by setting an error state or showing an error message
      }
    }
  }, [fetchMode]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        height: "82vh",
        padding: "15px",
        gap: 15,
      }}
    >
      {snackbar && (
        <SnackBar
          message={snackbar.message}
          time={snackbar.duration}
          type={snackbar.type}
        />
      )}{" "}
      {Object.keys(feedData)?.length !== 0 ? (
        feedData?.data?.feed?.edges
          ?.filter((item: any) => Boolean(item?.node?.coverImage))
          .map((item: any) => (
            <FeedCard
              item={item}
              handleRead={handleRead}
              handleShowProfile={handleShowProfile}
              showSnackbar={showSnackbar}
            />
          ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Personalized;
