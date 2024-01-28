import React, { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (content === "Logout") {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{ display: "inline-block" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
        {isHovered && (
          <div
            style={{
              position: "absolute",
              wordBreak: "normal",
              right: "35px",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "8px 8px",
              color: "black",
              borderRadius: "4px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              whiteSpace: "nowrap",
              fontSize: "12px",
              display: "block",
            }}
          >
            {content}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{ display: "inline-block" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
        {isHovered && (
          <div
            style={{
              position: "absolute",
              wordBreak: "normal",
              right: "45px",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "8px 8px",
              color: "white",
              borderRadius: "4px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              whiteSpace: "nowrap",
              fontSize: "12px",
            }}
            className="nav-btn-gradient"
          >
            {content}
          </div>
        )}
      </div>
    );
  }
};

export default Tooltip;
