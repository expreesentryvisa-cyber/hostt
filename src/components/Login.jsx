import "../Login.css";
import { Link } from "react-router-dom";
import Header from "./Header";
const Login = () => {
  return (
    <>
    <Header/>
    <div>
      {/* Header Bar */}
      <div className="header-bar"></div>

      <div className="container">
        {/* Info Box */}
        <div className="info-box">
          <h2>Information</h2>
          <h3>ImmiAccount technical issue - 25 September 2025</h3>
          <p>
            We are aware of system issues that are affecting some ImmiAccount
            users. Affected users currently receive the following error message:
          </p>
          <ul>
            <li>
              An unexpected error occurred. Please close all open browsers and
              try again
            </li>
          </ul>
          <p>
            We are currently working to resolve the issue and apologies for any
            inconvenience it has caused.
          </p>
          <p>
            Users do not need to contact the Department or submit technical
            support requests for inquiries relating to this issue.
          </p>
        </div>

        {/* Login Section */}
        <div className="content-section">
          <h2>Login to ImmiAccount</h2>
          <p>
            Fields marked <span className="required-star">*</span> must be
            completed.
          </p>
          <form>
            <div className="form-group-lr">
              <label htmlFor="username">
                Username <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <input type="text" id="username" />
                <span className="help-icon">?</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <input type="password" id="password" />
                <span className="help-icon">?</span>
              </div>
            </div>
            <div className="button-container">
              <button type="button" className="btn btn-default">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <div style={{ clear: "both" }}></div>
            </div>
          </form>
        </div>

        {/* Helper Links */}
        <div className="helper-links">
          <a href="#">
            I have forgotten my ImmiAccount username or password
          </a>
          <a href="#">
            I no longer have access to my multi-factor authentication app
          </a>
        </div>

        {/* Create Account Section */}
        <div className="content-section" id="create-account">
          <h2>Create an ImmiAccount</h2>
          <p>
            Create an ImmiAccount to access the Department of Home Affairs's
            online services.
          </p>
          <Link to="/register">
          <button type="button" className="btn btn-default">
            Create ImmiAccount{" "}
            <span style={{ fontSize: "10px", verticalAlign: "top" }}></span>
          </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="footer">
          <a href="#">Accessibility</a> |{" "}
          <a href="#">Copyright & Disclaimer</a> |{" "}
          <a href="#">Online Security</a> | <a href="#">Privacy</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
