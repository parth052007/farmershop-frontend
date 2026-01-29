import "./HelpfulToYou.css";

export default function HelpfulToYou() {
  const videos = [
    {
      title: "Tomato Farming Full Guide",
      link: "https://www.youtube.com/watch?v=1X7x4Z8gJ4E",
      thumb: "https://img.youtube.com/vi/1X7x4Z8gJ4E/hqdefault.jpg"
    },
    {
      title: "Organic Farming Techniques",
      link: "https://www.youtube.com/watch?v=4OjtlispW0I",
      thumb: "https://img.youtube.com/vi/4OjtlispW0I/hqdefault.jpg"
    },
    {
      title: "Profitable Organic Farming",
      link: "https://www.youtube.com/watch?v=4OjtlispW0I",
      thumb: "https://img.youtube.com/vi/4OjtlispW0I/hqdefault.jpg"
    },
    {
      title: "Drip Irrigation System",
      link: "https://www.youtube.com/watch?v=r21RZFHWcic",
      thumb: "https://img.youtube.com/vi/r21RZFHWcic/hqdefault.jpg"
    }
  ];

  return (
    <div className="help-wrapper">
      <h1>🌾 Helpful To You</h1>
      <p>Learn modern & smart farming from experts</p>

      <div className="video-grid">
        {videos.map((v, i) => (
          <a
            className="video-card"
            key={i}
            href={v.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={v.thumb} alt={v.title} />
            <h3>{v.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
