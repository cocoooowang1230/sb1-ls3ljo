import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Ticket, Flame, X, Dog } from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  provider: string;
  reward: number;
  category: 'survey' | 'social media' | 'video';
  popularity: number;
  imageUrl: string;
}

const missions: Mission[] = [
  { id: 1, title: "首要任務：身份驗證", provider: "Twin3", reward: 0.03, category: 'survey', popularity: 999, imageUrl: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
  { id: 2, title: "Welcome to Bitdog", provider: "Bitdog", reward: 0.01, category: 'social media', popularity: 999, imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
  { id: 3, title: "Unlock Exclusive Rewards", provider: "Bitdog", reward: 0.05, category: 'survey', popularity: 999, imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
  { id: 4, title: "Boost Your Social Influence", provider: "9starst", reward: 0.01, category: 'social media', popularity: 999, imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
];

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'survey' | 'social media' | 'video'>('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRewardCard, setShowRewardCard] = useState(false);
  const [activeRewardCard, setActiveRewardCard] = useState<'3-day' | '15-day' | '30-day' | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [show3DayReward, setShow3DayReward] = useState(false);
  const totalDays = 30;
  const progressPercentage = (currentDay / totalDays) * 100;

  useEffect(() => {
    if (currentDay === 3) {
      setShow3DayReward(true);
    } else if (currentDay === 15 || currentDay === 30) {
      setActiveRewardCard(currentDay === 15 ? '15-day' : '30-day');
      setShowRewardCard(true);
    }
  }, [currentDay]);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const toggleRewardCard = (type: '3-day' | '15-day' | '30-day') => {
    setActiveRewardCard(type);
    setShowRewardCard(true);
  };

  const handleFeedDog = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
    }
    console.log("Feeding the dog");
  };

  const renderRewardCard = () => {
    switch (activeRewardCard) {
      case '3-day':
        return (
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">3-Day sign-in reward</h3>
            <div className="flex space-x-4">
              <div className="text-center">
                <img src="https://img.icons8.com/color/48/000000/dog-collar.png" alt="Collar" className="w-12 h-12 mx-auto" />
                <p>Collar</p>
              </div>
              <div className="text-center">
                <img src="https://img.icons8.com/color/48/000000/dog-bone.png" alt="Bone" className="w-12 h-12 mx-auto" />
                <p>Bone</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <img src="https://img.icons8.com/color/48/000000/bitcoin.png" alt="Bitcoin" className="w-6 h-6 mr-2" />
                <p>Bitcoin lottery opportunity x1</p>
              </div>
            </div>
          </div>
        );
      case '15-day':
        return (
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">15-Day sign-in reward</h3>
            <div className="flex space-x-4">
              <div className="text-center">
                <Dog className="w-12 h-12 mx-auto text-blue-600" />
                <p>Growing</p>
              </div>
              <div className="text-center">
                <img src="https://img.icons8.com/color/48/000000/chicken-leg.png" alt="Chicken Leg" className="w-12 h-12 mx-auto" />
                <p>Chicken Leg</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <img src="https://img.icons8.com/color/48/000000/bitcoin.png" alt="Bitcoin" className="w-6 h-6 mr-2" />
                <p>Bitcoin lottery opportunity x5</p>
              </div>
            </div>
          </div>
        );
      case '30-day':
        return (
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">30-Day sign-in reward</h3>
            <div className="flex space-x-4">
              <div className="text-center">
                <Dog className="w-12 h-12 mx-auto text-blue-600" />
                <p>Growing</p>
              </div>
              <div className="text-center">
                <img src="https://img.icons8.com/color/48/000000/lottery.png" alt="Lottery" className="w-12 h-12 mx-auto" />
                <p>Lottery</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <img src="https://img.icons8.com/color/48/000000/bitcoin.png" alt="Bitcoin" className="w-6 h-6 mr-2" />
                <p>Bitcoin lottery opportunity x10</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderCalendar = () => {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">30-Day Sign-in Calendar</h3>
          <button onClick={toggleCalendar} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div
              key={day}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                day <= currentDay ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getDogImage = () => {
    if (currentDay >= 30) {
      return "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
    } else if (currentDay >= 15) {
      return "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
    } else {
      return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
    }
  };

  const filteredMissions = activeCategory === 'all' 
    ? missions 
    : missions.filter(mission => mission.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 relative">
        <div className="absolute top-4 right-4 flex space-x-4">
          <button onClick={toggleCalendar} className="text-blue-600 hover:text-blue-800">
            <Calendar size={24} />
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            <Ticket size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <img src={getDogImage()} alt="Dog" className="w-40 h-40 object-cover rounded-full mb-4" />
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-10 mb-2 relative">
            <div className="bg-blue-600 h-10 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white">
              {currentDay}/{totalDays}
            </span>
          </div>
          <div className="w-full max-w-xs flex justify-between mt-1 mb-4">
            <button onClick={() => toggleRewardCard('3-day')} className="focus:outline-none">
              <img src="https://img.icons8.com/color/48/000000/dog-collar.png" alt="Dog Collar" className="w-6 h-6" />
            </button>
            <button onClick={() => toggleRewardCard('15-day')} className="focus:outline-none">
              <img src="https://img.icons8.com/color/48/000000/chicken-leg.png" alt="Chicken Leg" className="w-6 h-6" />
            </button>
            <button onClick={() => toggleRewardCard('30-day')} className="focus:outline-none">
              <img src="https://img.icons8.com/color/48/000000/dog-bowl.png" alt="Dog Bowl" className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={handleFeedDog}
            className="mb-2 bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 transition-colors"
          >
            <img src="https://img.icons8.com/color/48/000000/dog-bone.png" alt="Feed Dog" className="w-6 h-6" />
          </button>
        </div>

        {showCalendar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {renderCalendar()}
          </div>
        )}

        {showRewardCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative">
              {renderRewardCard()}
              <button 
                onClick={() => setShowRewardCard(false)} 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {show3DayReward && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full animate-slide-up relative">
              <button 
                onClick={() => setShow3DayReward(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-center mb-6">3-Day sign-in reward</h2>
              <div className="flex justify-center space-x-8 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <img src="https://img.icons8.com/color/48/000000/dog-collar.png" alt="Collar" className="w-12 h-12" />
                  </div>
                  <p className="text-lg font-medium">Collar</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <img src="https://img.icons8.com/color/48/000000/dog-bone.png" alt="Bone" className="w-12 h-12" />
                  </div>
                  <p className="text-lg font-medium">Bone</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <img src="https://img.icons8.com/color/48/000000/bitcoin.png" alt="Bitcoin" className="w-8 h-8 mr-3" />
                  <p className="text-lg">Bitcoin lottery opportunity x1</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg">
        <div className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-y-0 mb-6">
          {['all', 'survey', 'social media', 'video'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as any)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMissions.map((mission) => (
            <Link key={mission.id} to={`/mission/${mission.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={mission.imageUrl} alt={mission.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{mission.title}</h2>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{mission.provider}</span>
                  <div className="flex items-center">
                    <Flame className="text-red-500 mr-1" size={16} />
                    <span>{mission.popularity}+</span>
                  </div>
                </div>
                <div className="mt-2 text-right">
                  <span className="font-bold text-yellow-600">{mission.reward.toFixed(3)} BTC</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;