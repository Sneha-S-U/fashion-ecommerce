import React from "react";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import "./CardGrid.css";
import { Link } from "react-router";

const cards = [
  {
    title: "Korean Wear",
    imageId: "1517021897933-0e0319cfbc28",
  },
  {
    title: "Stylish Jumpsuit",
    imageId: "1533903345306-15d1c30952de",
  },
  {
    title: "Summer Wear",
    imageId: "1545243424-0ce743321e11",
  },
  {
    title: "Kurti",
    imageId: "1531306728370-e2ebd9d7bb99",
  },
];

const Card = ({ title, imageId }) => {
  const imageUrl = `https://images.unsplash.com/photo-${imageId}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max`;
  const shareText = encodeURIComponent(`${title}`);
  const shareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <div className="card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="card-overlay" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions">
          <Link className="custom" href="/wishlist" title="Add to Wishlist">
            <button className="card-btn wishlist-btn">
              <FaHeart /> Wishlist
            </button>
          </Link>
          <Link
            className="custom"
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
          >
            <button className="card-btn share-btn">
              <FaWhatsapp /> Share
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CardGrid = () => (
  <section className="card-section">
    <div className="trending-header">
      <h2 className="trending-title">Top Trending Outfits</h2>
      <p className="trending-subtitle">
        Discover the most loved styles of the season
      </p>
    </div>
    <main className="page-content">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </main>
  </section>
);

export default CardGrid;
