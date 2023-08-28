import React, { useState, useEffect } from 'react';

const PexelsSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const apiKey = '5A16lJuAZATFiR3GgSNWO8ZlEz8zWy26HoBAaN6GzouLd9s5OIQvC6ea';

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (keyword.trim() !== '') {
      const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=6`;

      fetch(apiUrl, {
        headers: {
          'Authorization': apiKey
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.photos && data.photos.length > 0) {
            const urls = data.photos.map(photo => photo.src.medium);
            setImageUrls(urls);
          } else {
            setImageUrls([]);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      setImageUrls([]);
    }
  }, [keyword]);

  return (
    <div>
      <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="Nhập từ khóa" />
      {imageUrls.length > 0 && imageUrls.map(url => (
        <img key={url} src={url} alt="Hình ảnh liên quan" />
      ))}
    </div>
  );
};

export default PexelsSearch;