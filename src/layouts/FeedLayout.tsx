import { useState } from "react";

const FeedLayout = () => {
  const [tabType, setTabType] = useState("feed");
  return <h1 className="hx-h1">hello feed</h1>;
};

export default FeedLayout;
