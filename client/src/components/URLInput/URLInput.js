import { useState } from "react";

import LinkIcon from "@mui/icons-material/Link";
import Alert from "@mui/material/Alert";

import "./URLInput.css";

import isValidUrl from "../../utils";

function URLInput({ index, handleChange, url }) {
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (e) => {
    setIsValid(isValidUrl(e.target.value));
  };

  const handleFocus = () => {
    setIsValid(true);
  };

  return (
    <div className={`URLInput-container ${isValid ? "" : "input-error"}`}>
      <LinkIcon className="input-icon" />
      <input
        name="url"
        className="url-input"
        value={url}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={(e) => handleChange(index, e.target.value)}
      />
      {!isValid && (
        <Alert className="alert" variant="filled" severity="error">
          Invalid
        </Alert>
      )}
    </div>
  );
}

export default URLInput;
