import React from "react";

function ErrorMessage({ message }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "10px" }}>
      {message && (
        <div className="error-message-box">
          <div className="error-message">{message}</div>
        </div>
      )}
    </div>
  );
}

export default ErrorMessage;
