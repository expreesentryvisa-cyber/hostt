import "../Register.css";
import Header from "./Header";

const Register = () => {
  return (
    <>
    <Header/>
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="govt-logo">
          <span className="mock-logo"></span>
          <p>
            Australian Government
            <br />
            Department of Home Affairs
          </p>
        </div>
        <h1 className="logo-title">ImmiAccount</h1>
      </header>

      {/* Navbar */}
      <div className="navbar">
        <h2>Create an ImmiAccount</h2>
      </div>

      {/* Main Content */}
      <main className="content">
        <h1>Email address</h1>

        <p className="instruction">
          Enter an email address to be used for account notifications - such as
          password resets.
        </p>
        <p className="instruction">
          A verification code will be sent to this email address.
        </p>
        <p className="instruction">
          You will need to enter the verification code on the next screen.
        </p>

        <hr />

        <p>
          Fields marked <span className="required-star">*</span> must be
          completed.
        </p>

        <form>
          <div className="form-group-lr">
            <label htmlFor="email">
              Email address <span className="required-star">*</span>
            </label>
            <input type="text" id="email" name="email" />
            <span className="info-icon" title="Need help?">
              ?
            </span>
          </div>
        </form>
      </main>

      {/* Footer Button Bar */}
      <div className="footer-bar">
        <button className="cancel-btn">Cancel</button>
        <button className="send-verification-btn">Send verification code</button>
      </div>

      {/* Footer Links */}
      <footer className="page-footer">
        <a href="#">Accessibility</a>
        <a href="#">Copyright & Disclaimer</a>
        <a href="#">Online Security</a>
        <a href="#">Privacy</a>
      </footer>
    </div>
    </>
  );
};

export default Register;
