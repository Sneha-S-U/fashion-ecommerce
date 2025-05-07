import React from 'react';
import './TrendingRoundSection.css';

const outfits = [
  {
    title: 'TOPS',
    image: 'https://i.postimg.cc/sxHM4d2c/top.webp',
    link: '/dresses/summer'
  },
  {
    title: 'BOTTOMS',
    image: 'https://i.postimg.cc/htdXTYRL/bottom.webp',
    link: '/dresses/party'
  },
  {
    title: 'KURTi',
    image: 'https://i.postimg.cc/NMJsW8wG/kurti.jpg',
    link: '/dresses/casual'
  },
  {
    title: 'SAREES',
    image: 'https://i.postimg.cc/wv63KTy2/saree.webp',
    link: '/dresses/traditional'
  },
  {
    title: 'ETHENIC SET',
    image: 'https://i.postimg.cc/T2BL1xZd/ethnic.jpg',
    link: '/dresses/formal'
  },
  {
    title: 'DRESSES',
    image: 'https://i.postimg.cc/mrdhsWYG/img1.webp',
    link: '/dresses/formal'
  }
];

const TrendingRoundSection = () => {
  return (
    <section className="round-section">
      <h2 className="round-title">Top Trending Outfits</h2>
      <div className="round-grid">
        {outfits.map((item, index) => (
          <a href={item.link} className="round-item" key={index}>
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TrendingRoundSection;
