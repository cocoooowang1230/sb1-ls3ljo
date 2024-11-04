import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Survey', 'Photography', 'Shopping', 'Social Media', 'Food', 'Crafts',
  'Gaming', 'Fashion', 'Environment', 'DIY', 'Cooking', 'Writing',
  'Pets', 'Music', 'Entertainment', 'Art', 'Sports', 'DIY'
];

const InterestSurvey: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    navigate('/mission/1', { state: { surveyCompleted: true } });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md animate-slide-up">
      <h2 className="text-2xl font-bold mb-4 animate-slide-down">Discover task that</h2>
      <p className="mb-4 animate-fade-in">Select your preferred task categories below:</p>
      <div className="grid grid-cols-3 gap-4 mb-6 stagger-animate">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`p-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
              selectedCategories.includes(category)
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 animate-slide-up"
      >
        Done
      </button>
    </div>
  );
};

export default InterestSurvey;