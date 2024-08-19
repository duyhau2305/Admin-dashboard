import React from 'react';

const FormatDate = ({ date }) => {
  if (!date) return null;

  const formattedDate = new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return <span>{formattedDate}</span>;
};

export default FormatDate;
