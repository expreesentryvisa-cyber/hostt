
const Contact = () => {
  return (
    <section className="contact-section">
      <div className="container">
        <h2>Contact</h2>
        <div className="contact-grid">
          <div className="contact-column">
            <h3>General</h3>
            <p>
              Do you have a question, feedback or a complaint? Let us help you
              find the right answer.
            </p>
            <a href="#">Popular questions</a>
            <a href="#">Contact us</a>
          </div>
          <div className="contact-column">
            <h3>Report suspicious activities</h3>
            <p>
              Seen suspicious customs, border protection, visa or immigration
              activity?
            </p>
            <a href="#" className="btn btn-report">
              Report online to BORDER WATCH
            </a>
          </div>
          <div className="contact-column">
            <h3>National Security Hotline</h3>
            <div className="hotline-box">
              <p>IF IT DOESN'T ADD UP</p>
              <h4>SPEAK UP</h4>
              <span>VISIT THE</span>
              <a href="#">NATIONAL SECURITY WEBSITE</a>
              <a href="#">NATIONALSECURITY.GOV.AU</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;