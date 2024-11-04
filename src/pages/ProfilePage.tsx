import React, { useState } from 'react';
import { ArrowLeft, Award, Star, FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSocialMedia, setActiveSocialMedia] = useState('overall');
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [showSocialInfluenceModal, setShowSocialInfluenceModal] = useState(false);
  const [showDogGuideModal, setShowDogGuideModal] = useState(false);

  const milestones = [
    { tasks: 5, icon: '🥉' },
    { tasks: 20, icon: '🥈' },
    { tasks: 50, icon: '🥇' },
    { tasks: 100, icon: '🏆' },
    { tasks: 200, icon: '💎' },
    { tasks: 500, icon: '👑' },
    { tasks: 1000, icon: '🌟' },
    { tasks: 2000, icon: '🔥' },
    { tasks: 5000, icon: '🌈' },
    { tasks: 10000, icon: '🚀' },
    { tasks: 20000, icon: '🌠' },
    { tasks: 50000, icon: '🌌' },
  ];

  const socialMediaData = {
    overall: { followers: 80, engagement: 70, ctr: 60, shares: 75, views: 85 },
    facebook: { followers: 75, engagement: 65, ctr: 55, shares: 70, views: 80 },
    instagram: { followers: 85, engagement: 75, ctr: 65, shares: 80, views: 90 },
    youtube: { followers: 90, engagement: 80, ctr: 70, shares: 85, views: 95 },
  };

  const radarData = {
    labels: ['Followers', 'Engagement rate', 'CTR', 'Shares', 'Video views'],
    datasets: [
      {
        label: 'Social Media Influence',
        data: Object.values(socialMediaData[activeSocialMedia as keyof typeof socialMediaData]),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false
  };

  const dogs = [
    { name: 'Doberman', image: 'https://img.icons8.com/color/96/000000/doberman.png' },
    { name: 'Poodle', image: 'https://img.icons8.com/color/96/000000/poodle.png' },
    { name: 'Husky', image: 'https://img.icons8.com/color/96/000000/husky.png' },
    { name: 'Bulldog', image: 'https://img.icons8.com/color/96/000000/bulldog.png' },
    { name: 'Chihuahua', image: 'https://img.icons8.com/color/96/000000/chihuahua.png' },
    { name: 'Golden Retriever', image: 'https://img.icons8.com/color/96/000000/golden-retriever.png' },
    { name: 'German Shepherd', image: 'https://img.icons8.com/color/96/000000/german-shepherd.png' },
    { name: 'Labrador', image: 'https://img.icons8.com/color/96/000000/labrador.png' },
    { name: 'Beagle', image: 'https://img.icons8.com/color/96/000000/beagle.png' },
  ];

  const totalInfluenceScore = Object.values(socialMediaData.overall).reduce((a, b) => a + b, 0) / 5;

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-8">
      <div className="relative bg-white p-4">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile" 
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h1 className="text-xl font-bold">Alex Smit</h1>
              <p className="text-sm text-gray-600">October 21, Monday</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Award className="text-yellow-500" size={24} />
            <Star className="text-yellow-500" size={24} />
            <FileText className="text-blue-500" size={24} />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <section className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4" onClick={() => setShowMilestoneModal(true)}>My Milestone</h2>
            <div className="flex overflow-x-auto pb-2">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center flex-shrink-0 mr-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${index === 0 ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                    {milestone.icon}
                  </div>
                  <p className="text-xs mt-1">{milestone.tasks} Tasks</p>
                </div>
              ))}
            </div>
          </section>

          <section 
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => setShowSocialInfluenceModal(true)}
          >
            <h2 className="text-lg font-semibold mb-4">My Social Media Influence</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">{totalInfluenceScore.toFixed(1)}</span>
              <span className="text-sm text-gray-600">Total Influence Score</span>
            </div>
            <div className="h-48">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </section>

          <section 
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => setShowDogGuideModal(true)}
          >
            <h2 className="text-lg font-semibold mb-4">Dog Guide</h2>
            <div className="flex justify-between">
              {dogs.slice(0, 3).map((dog, index) => (
                <div key={index} className="text-center">
                  <img src={dog.image} alt={dog.name} className="w-16 h-16 mx-auto" />
                  <p className="text-xs mt-1">{dog.name}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {showMilestoneModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">My Milestone</h3>
              <button onClick={() => setShowMilestoneModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto ${index <= 1 ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                    {milestone.icon}
                  </div>
                  <p className="text-xs mt-1">{milestone.tasks} Tasks</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSocialInfluenceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Social Influence Dashboard</h3>
              <button onClick={() => setShowSocialInfluenceModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="mb-4">
              <h4 className="text-base font-semibold mb-2">Total Influence Score</h4>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full" 
                  style={{ width: `${totalInfluenceScore}%` }}
                ></div>
              </div>
              <p className="text-right mt-1 text-sm">{totalInfluenceScore.toFixed(1)}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-base font-semibold mb-2">Platform Distribution</h4>
              <div className="flex justify-between mb-2">
                {Object.keys(socialMediaData).filter(key => key !== 'overall').map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setActiveSocialMedia(platform)}
                    className={`px-2 py-1 rounded text-xs ${activeSocialMedia === platform ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-2">Influence Indicator Analysis</h4>
              <div className="h-48">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showDogGuideModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Dog Guide</h3>
              <button onClick={() => setShowDogGuideModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {dogs.map((dog, index) => (
                <div key={index} className="text-center">
                  <img src={dog.image} alt={dog.name} className="w-16 h-16 mx-auto" />
                  <p className="text-xs mt-1">{dog.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;