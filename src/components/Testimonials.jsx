
const newsData = [
  {
    date: "19 Sep 2025",
    title:
      "New Ministerial Instructions and Minister's Personal Procedural Decisions",
    img: "https://images.unsplash.com/photo-1605199929238-51f153b6a41f?q=80&w=1974",
  },
  {
    date: "08 Sep 2025",
    title: "Systems maintenance 12 September - 13 September 2025",
    img: "https://images.unsplash.com/photo-1588507652933-2c6b3e3a479d?q=80&w=2070",
  },
  {
    date: "20 Aug 2025",
    title:
      "Important information for Partner (subclasses 309 and 820) visa holders",
    img: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2070",
  },
];

const NewsCard = ({ date, title, img }) => (
  <div className="news-card">
    <img src={img} alt={title} />
    <div className="news-card-content">
      <span>{date}</span>
      <p>{title}</p>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="news-section container">
      <h2>News</h2>
      <div className="news-grid">
        {newsData.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;