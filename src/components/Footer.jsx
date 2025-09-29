import React from "react";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links-main">
            <a href="#">HOME AFFAIRS PORTFOLIO</a>
            <a href="#">TRAVEL AND CROSSING THE BORDER</a>
            <a href="#">IMPORT, EXPORT AND BUYING ONLINE</a>
            <a href="#">NATIONAL SECURITY</a>
            <a href="#">EMERGENCY MANAGEMENT</a>
            <a href="#">CYBER SECURITY</a>
            <a href="#">MULTICULTURAL AFFAIRS</a>
          </div>
          <div className="footer-links-secondary">
            <a href="#">Who we are</a>
            <a href="#">Our Ministers</a>
            <a href="#">Popular questions</a>
            <a href="#">Glossary</a>
            <a href="#">Forms</a>
            <a href="#">Online services</a>
            <a href="#">Compliments, complaints and suggestions</a>
          </div>
         
        </div>
        <div className="footer-acknowledgement">
          <p>
            The Department of Home Affairs acknowledges the Traditional
            Custodians of Country throughout India and their continuing
            connection to land, sea and community. We pay our respects to all
            peoples, their cultures and to their elders past, present and
            emerging.
          </p>
        </div>
        <div className="footer-bottom">
          <a href="#">Back to top &uarr;</a>
          <a href="#" className="btn btn-ask">
            Ask a question
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;