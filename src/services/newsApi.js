import axios from 'axios';

const API_KEY = 'b0023ae517e94d13b9e4168da878cdab';
const BASE_URL = 'https://newsapi.org/v2';

export const getTopHeadlines = async (country = 'in') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        apiKey: API_KEY,
        pageSize: 10,
      },
    });
    return response.data.articles.filter((a) => a.urlToImage);
  } catch (error) {
    console.error('News API Error:', error);
    // Fallback mock data for development
    return [
      {
        title: 'Want to climb Mount Everest?',
        description:
          'In the years since human beings first reached the summit of Mount Everest in 1953, climbing the world\'s highest mountain has changed dramatically. Today, hundreds of mountaineers manage the feat each year thanks to improvements in knowledge, technology and the significant infrastructure provided by commercially guided expeditions that provide a well-like highway up the mountain for those willing to accept both the...',
        urlToImage: 'https://images.unsplash.com/photo-1516490658377-4900e1e4cfee?w=500',
        publishedAt: '2023-02-20T07:00:00Z',
      },
      {
        title: 'The Future of Space Exploration',
        description:
          'As private companies and government agencies push the boundaries of space travel, new missions to Mars and beyond are being planned. The next decade promises unprecedented advances in our understanding of the cosmos.',
        urlToImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500',
        publishedAt: '2023-02-21T10:30:00Z',
      },
      {
        title: 'AI Revolution in Healthcare',
        description:
          'Artificial intelligence is transforming how we diagnose and treat diseases. From early cancer detection to personalized medicine, AI tools are helping doctors make better decisions faster than ever before.',
        urlToImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500',
        publishedAt: '2023-02-22T14:15:00Z',
      },
    ];
  }
};
