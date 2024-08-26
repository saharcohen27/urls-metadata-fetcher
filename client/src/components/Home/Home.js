import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";

import URLInput from "../URLInput/URLInput";
import AlertWrapper from "../AlertWrapper/AlertWrapper";
import Results from "../Results/Results";

import { changeVal, addValue, allValidURLs } from "../../utils";
import fetchData from "../../services/fetchURLs";

import "./Home.css";

const baseUrl = process.env.REACT_APP_API_URL;

function Home() {
  const [urls, setUrls] = useState(Array(3).fill("https://"));
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [results, setResults] = useState([]);

  const addURL = () => {
    setUrls((prevUrls) => {
      return addValue(prevUrls, "https://");
    });
  };

  const handleChange = (index, newVal) => {
    setUrls((prevUrls) => {
      return changeVal(prevUrls, index, newVal);
    });
  };

  const handleSubmit = (e) => {
    setAlert({ type: "info", msg: "Loading..." });
    if (!allValidURLs(urls)) {
      setAlert({ type: "error", msg: "At Least one url is invalid" });
      return;
    }
    fetchData(`${baseUrl}/fetch-metadata`, urls)
      .then((results) => {
        setAlert({ type: "success", msg: "Success" });
        setResults(results);
      })
      .catch((error) => {
        setAlert({ type: "error", msg: "Error Fetching Data " + error });
      });
  };

  return (
    <div className="page-container">
      {alert.msg ? <AlertWrapper alert={alert} /> : ""}
      <div className="home-container">
        <div className="home-title">Insert URLs</div>
        <div className="form-container">
          {urls.map((url, index) => (
            <URLInput url={url} index={index} handleChange={handleChange} />
          ))}
          <div className="buttons">
            <div className="add-btn" onClick={addURL}>
              Add URL
              <AddIcon />
            </div>
            <div className="submit-btn" onClick={handleSubmit}>
              Submit
            </div>
          </div>
        </div>
      </div>
      {alert.type === "success" ? <Results results={results} /> : ""}
    </div>
  );
}

export default Home;
