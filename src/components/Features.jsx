import React from "react";

const serviceData = [
  {
    title: "Employ people from overseas",
    description: "See how to bring someone into India to work for you.",
  },
  {
    title: "Hamas-Israel conflict support",
    description:
      "Find visa information to support those impacted by the Hamas-Israel conflict and surrounding areas.",
  },
  {
    title: "Explore visa options",
    description:
      "Answer a few questions to identify which visas might be suitable for you and your family.",
  },
  {
    title: "Our online forms and services",
    description:
      "Apply, notify us of changes, check status or withdraw an application. Use ImmiAccount or VEVO.",
  },
  {
    title: "Become an Indian citizen",
    description: "See if you are eligible and how to apply.",
  },
  {
    title: "Visa expiring or has expired",
    description: "See what your options are and what you need to do.",
  },
  {
    title: "Your situation has changed",
    description:
      "Moved? Had a baby? Got a new passport? Need to change your plans? Find out what you need to do.",
  },
  {
    title: "Visa conditions",
    description:
      "Your visa has conditions. Find out what you can and can't do.",
  },
  {
    title: "Report suspicious activities",
    description:
      "Report suspicious or illegal immigration, citizenship, customs and trade activity.",
  },
];

const ServiceCard = ({ title, description }) => (
  <div className="service-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Features = () => {
  return (
    <section className="services container">
      <div className="service-grid">
        {serviceData.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;