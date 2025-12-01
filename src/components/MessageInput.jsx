import React from "react";
import { Icon } from "semantic-ui-react";

const MessageInput = ({ placeholder = "Message #general" }) => {
  return (
    <div
      style={{
        backgroundColor: "#272d36",
        borderRadius: "8px",
        margin: "10px 20px",
        border: "1px solid #3b3b3b",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Toolbar - Formatting Options */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          borderBottom: "1px solid #3b3b3b",
          gap: "8px",
        }}
      >
        {/* Formatting Icons */}
        <span
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
            fontWeight: "bold",
          }}
        >
          B
        </span>
        <span
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
            fontStyle: "italic",
          }}
        >
          I
        </span>
        <span
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
            textDecoration: "underline",
          }}
        >
          U
        </span>
        <span
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
            textDecoration: "line-through",
          }}
        >
          S
        </span>
        
        {/* Separator */}
        <div
          style={{
            width: "1px",
            height: "16px",
            backgroundColor: "#3b3b3b",
            margin: "0 4px",
          }}
        />
        
        {/* Link Icon */}
        <Icon
          name="linkify"
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
          }}
        />
        
        {/* List Icons */}
        <Icon
          name="list"
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
          }}
        />
        <Icon
          name="list"
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
          }}
        />
        
        {/* Separator */}
        <div
          style={{
            width: "1px",
            height: "16px",
            backgroundColor: "#3b3b3b",
            margin: "0 4px",
          }}
        />
        
        {/* Code Block Icon */}
        <span
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
            fontFamily: "monospace",
          }}
        >
          {"</>"}
        </span>
        
        {/* Quote Icon */}
        <Icon
          name="quote left"
          style={{
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "14px",
            margin: "0 4px",
          }}
        />
      </div>

      {/* Middle Section - Text Input */}
      <div
        style={{
          padding: "12px",
          minHeight: "60px",
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          readOnly
          style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontSize: "14px",
            fontFamily: "inherit",
          }}
        />
        <style>
          {`
            input::placeholder {
              color: #9ca3af;
            }
          `}
        </style>
      </div>

      {/* Bottom Toolbar - Action Options */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          borderTop: "1px solid #3b3b3b",
          gap: "8px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Plus Icon */}
          <Icon
            name="plus circle"
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "16px",
            }}
          />
          
          {/* Aa Icon */}
          <span
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "underline",
            }}
          >
            Aa
          </span>
          
          {/* Emoji Icon */}
          <Icon
            name="smile"
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "16px",
            }}
          />
          
          {/* @ Icon */}
          <Icon
            name="at"
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "16px",
            }}
          />
          
          {/* Video Icon */}
          <Icon
            name="video"
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "16px",
            }}
          />
          
          {/* Microphone Icon */}
          <Icon
            name="microphone"
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "16px",
            }}
          />
          
          {/* Square with diagonal line */}
          <Icon
            name="square outline"
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "16px",
            }}
          />
        </div>
        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Separator */}
          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: "#3b3b3b",
              margin: "0 4px",
            }}
          />
          
          {/* Send Icon */}
          <Icon
            name="paper plane"
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "16px",
            }}
          />
          
          {/* Dropdown Icon */}
          <Icon
            name="chevron down"
            style={{
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "14px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
