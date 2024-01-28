const SnackBar = ({ message, type }: any) => {
  // Define common styles
  const containerStyle: any = {
    width: "400px",
    position: "fixed",
    top: "100px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    right: "0",
  };

  const messageStyle: any = {
    position: "fixed",
    color: "white",
    padding: "12px 20px",
    borderRadius: "4px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    fontSize: "12px",
  };

  // Customize styles based on the type
  if (type === "success" || type === "login") {
    return (
      <div style={containerStyle}>
        <p
          style={{
            ...messageStyle,
            backgroundColor: "rgba(16, 185, 129, 0.95)",
          }}
        >
          {message}
        </p>
      </div>
    );
  } else if (type === "logout") {
    return (
      <div style={containerStyle}>
        <p
          style={{
            ...messageStyle,
            backgroundColor: "rgba(224, 224, 224, 0.95)",
            color: "black",
          }}
        >
          {message}
        </p>
      </div>
    );
  } else if (type === "clipboard") {
    return (
      <div style={containerStyle}>
        <p
          style={{
            ...messageStyle,
            backgroundColor: "rgba(6, 143, 204, 0.95)",
          }}
        >
          {message}
        </p>
      </div>
    );
  } else if (type === "error") {
    return (
      <div style={containerStyle}>
        <p
          style={{
            ...messageStyle,
            backgroundColor: "rgba(239, 68, 68, 0.95)",
          }}
        >
          {message}
        </p>
      </div>
    );
  } else {
    return (
      <div style={containerStyle}>
        <p
          style={{
            ...messageStyle,
            backgroundColor: "rgba(234, 179, 8, 0.95)",
          }}
        >
          {message}
        </p>
      </div>
    );
  }
};

export default SnackBar;
