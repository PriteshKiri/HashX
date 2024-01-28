import { useContext, useEffect, useState, FormEvent } from "react";
import { LogOutContext, SetLogOutContext } from "../Layout";
import Profile from "../components/Profile";
import SearchProfile from "../components/SearchProfile";

declare global {
  interface Window {
    chrome: any;
  }
}

const SearchLayout = () => {
  const setLogOut: any = useContext(SetLogOutContext);

  const [userDetails, setUserDetails]: any = useState({});
  const [username, setUsername]: any = useState("");
  const [fetchMode, setFetchMode] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (username.trim()) {
      setFetchMode(true);
    }
  };

  useEffect(() => {
    if (fetchMode) {
      const query = `
      {
        user(username: "${username}") {
          location
          profilePicture
          name
          followersCount
          followingsCount
          bio {
            text
          }
          tagline
          socialMediaLinks {
            website
            github
            twitter
            instagram
            facebook
            stackoverflow
            linkedin
            youtube
          }
          publications(first: 10) {
            edges {
              node {
                title
                posts(first: 10) {
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
                      readTimeInMinutes
                    }
                  }
                }
              }
            }
          }
          posts(pageSize: 10, page: 10) {
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
                readTimeInMinutes
              }
            }
            nodes {
              title
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
          },
          body: JSON.stringify({ query }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            if (response?.errors?.length) {
              setLogOut(true);
              setFetchMode(false);
            } else {
              setLogOut(false);
              setUserDetails(response);
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
        paddingTop: 0,
      }}
    >
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
          position: "relative",
        }}
        className="bdr-b bdr-l"
      >
        {Object.keys(userDetails)?.length === 0 ? (
          <p style={{ fontWeight: "600", margin: "0px" }}>
            Search Hashnode User
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              width: "100%",
              background: "black",
              top: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                cursor: "pointer",
              }}
              onClick={() => {
                setFetchMode(false);
                setUserDetails({});
              }}
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

            <a
              href={userDetails?.data?.post?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
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
        )}
      </div>
      {Object.keys(userDetails)?.length === 0 ? (
        <div style={{ flexDirection: "column" }} className="mycenter">
          <img
            style={{
              height: "200px",
              width: "225px",
              margin: "45px auto",
              marginBottom: "15px",
              borderRadius: "50%",
            }}
            alt="search hashnode user"
            src="https://res.cloudinary.com/ddlhk5yje/image/upload/v1706439085/giphy_cokelm.gif"
          />

          <small
            style={{
              textAlign: "center",
              margin: "10px",
              fontSize: "10px",
              width: "85%",
              marginTop: "20px",
              color: "#b7b7b7",
            }}
          >
            Username is unique and tied with user's profile URL. Example{" "}
            <a
              className="hx-link"
              href="https://hashnode.com/@Pritesh16"
              target="__blank"
            >
              https://hashnode.com/@username
            </a>{" "}
          </small>
          <div
            style={{
              marginBottom: "20px",
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              type="text"
              placeholder="Enter username"
              className="hx-input"
            />

            <div
              className="mycenter"
              style={{
                gap: 15,
                marginTop: 15,
                justifyContent: "space-between",
              }}
            >
              <button className="hx-button">Clear</button>
              <button
                type="submit"
                className="hx-button"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SearchProfile data={userDetails?.data} />
      )}
    </div>
  );
};

export default SearchLayout;
