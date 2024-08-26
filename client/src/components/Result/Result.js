import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import AlertWrapper from "../AlertWrapper/AlertWrapper";

import "./Result.css";

function ResultError({ url, error }) {
  return (
    <div className="result-container error">
      <div className="result-header">
        <AlertWrapper
          alert={{
            type: "error",
            variant: "outlined",
            msg: `Error fetching for ${url}. ${error}`,
          }}
        />
      </div>
    </div>
  );
}

function Result({ url, error, title, desc, image }) {
  if (error) {
    return <ResultError url={url} error={error} />;
  }

  return (
    <div className="result-container">
      <div className="result-header">
        <div className={`result-title ${title ? "" : "missing"}`}>
          {!!title ? title : "No Title Available"}
        </div>
        <a href={url} className="result-url">
          {url}<OpenInNewIcon fontSize="small" />
        </a>
      </div>
      <div className="result-body">
        <img
          alt="metadata-img"
          className="result-image"
          src={
            image
              ? image
              : "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg"
          }
        />
        <div className={`result-desc ${desc ? "" : "missing"}`}>
          {!!desc ? desc : "No Description Available"}
        </div>
      </div>
    </div>
  );
}

export default Result;
