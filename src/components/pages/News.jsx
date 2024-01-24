import React, { useState, useEffect } from 'react';

function News() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // Simulate fetching news from an API
    const fetchNews = () => {
      setTimeout(() => {
        // Replace this with actual API call
        setNewsItems([
          { id: 1, title: 'News Item 1', content: 'Content of News Item 1' },
          { id: 2, title: 'News Item 2', content: 'Content of News Item 2' },
          // Add more news items here
        ]);
      }, 1000);
    };

    fetchNews();
  }, []);

  const handleNewsClick = (newsItem) => {
    // Handle the click event
    console.log('Clicked News Item:', newsItem.id);
    // You can add routing or other logic here
  };

  return (
    <div className="news-container">
      {newsItems.map(newsItem => (
        <div key={newsItem.id} onClick={() => handleNewsClick(newsItem)} className="news-item">
          <h3>{newsItem.title}</h3>
          <p>{newsItem.content}</p>
        </div>
      ))}
    </div>
  );
}

export default News;
