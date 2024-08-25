import "./Results.css";

import Result from "../Result/Result";

function Results({ results }) {
  console.log(results);
  return (
    <div className="results-container">
      <div className="results-title">Results</div>
      {results.map((result) => (
        <Result
          url={result.url}
          error={result?.error}
          title={result?.title}
          desc={result?.description}
          image={result?.image}
        />
      ))}
    </div>
  );
}

export default Results;
