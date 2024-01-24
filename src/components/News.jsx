import React from 'react';

function News() {
  // Example headlines - replace with real data in a real app
  const headlines = [
    "Headline 1: Breaking News",
    "Headline 2: World Update",
    "Headline 3: Sports Highlights",
    // Add more headlines as needed
  ];

  return (
    <div className="flex flex-row gap-4 w-full bg-white">
      <div className="news-ticker">
        <div className="ticker-wrap">
          {headlines.map((headline, index) => (
            <div key={index} className="ticker-item">{headline}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
