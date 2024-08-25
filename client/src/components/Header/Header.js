import LinkIcon from "@mui/icons-material/Link";
import HttpIcon from "@mui/icons-material/Http";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <LinkIcon className="header-icon" fontSize="large" />
      <div className="header-title">URLs Metadata Fetcher</div>
      <HttpIcon className="header-icon" fontSize="large" />
    </div>
  );
}

export default Header;
