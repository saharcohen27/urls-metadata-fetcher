import Alert from "@mui/material/Alert";

import "./AlertWrapper.css";

function AlertWrapper({ alert }) {
  return (
    <>
      {alert.msg && (
        <Alert className="home-alert" variant={alert.variant || "filled"} severity={alert.type}>
          {alert.msg}
        </Alert>
      )}
    </>
  );
}

export default AlertWrapper;
