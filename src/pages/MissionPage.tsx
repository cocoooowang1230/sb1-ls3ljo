import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Users, Clock, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Task {
  name: string;
  completed: boolean;
  expanded: boolean;
}

interface Mission {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  provider: string;
  completions: number;
  status: 'ongoing' | 'ended' | 'completed';
  endTime: string;
  tasks: Task[];
  totalReward: number;
  currentPrizePool: number;
  reward: number;
}

const initialMission: Mission = {
  id: 1,
  title: "Welcome to Bitdog",
  description: "Complete the following tasks to earn your reward!",
  imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  provider: "Bitdog",
  completions: 1500,
  status: 'ongoing',
  endTime: "2024/04/30 22:00",
  tasks: [
    { name: "Interest Survey", completed: false, expanded: false },
    { name: "Connect Facebook", completed: false, expanded: false },
    { name: "Connect Youtube", completed: false, expanded: false },
    { name: "Connect X", completed: false, expanded: false },
    { name: "Share with 1 friend", completed: false, expanded: false },
  ],
  totalReward: 0.1,
  currentPrizePool: 0.007,
  reward: 0.0001,
};

const MissionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [missionState, setMissionState] = useState<Mission>(initialMission);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);

  useEffect(() => {
    setMissionState(prevState => ({
      ...prevState,
      id: Number(id),
      status: location.state?.fromHistory ? 'completed' : prevState.status,
      tasks: prevState.tasks.map(task => ({
        ...task,
        completed: location.state?.fromHistory ? true : task.completed
      }))
    }));

    if (location.state?.surveyCompleted) {
      handleVerifyTask(0);
    }
  }, [id, location.state]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(missionState.endTime);
      const diff = end.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [missionState.endTime]);

  useEffect(() => {
    setAllTasksCompleted(missionState.tasks.every(task => task.completed));
  }, [missionState.tasks]);

  const toggleTaskExpansion = (index: number) => {
    setMissionState(prevState => ({
      ...prevState,
      tasks: prevState.tasks.map((task, i) => 
        i === index ? { ...task, expanded: !task.expanded } : task
      ),
    }));
  };

  const handleGoTask = (index: number) => {
    if (index === 0) {
      navigate('/interest-survey');
    } else {
      console.log(`Navigating to task ${index + 1}`);
    }
  };

  const handleVerifyTask = (index: number) => {
    setMissionState(prevState => ({
      ...prevState,
      tasks: prevState.tasks.map((task, i) => 
        i === index ? { ...task, completed: true } : task
      ),
    }));
  };

  const handleClaimReward = () => {
    if (allTasksCompleted && missionState.status !== 'completed') {
      setShowClaimModal(true);
    }
  };

  const handleCheckRewards = () => {
    navigate('/my-tokens');
  };

  const handleCompleteOtherTasks = () => {
    setShowClaimModal(false);
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden animate-slide-up">
      <div className="relative">
        <img 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" 
          src={missionState.imageUrl} 
          alt={missionState.title} 
        />
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-2 right-2 bg-white rounded-full p-1 hover:scale-110 transition-transform duration-300"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold">{missionState.title}</h1>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2 animate-pulse">
              {missionState.provider.charAt(0)}
            </div>
            <span className="text-sm text-gray-600">{missionState.provider}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{missionState.description}</p>
        
        <div className="flex items-center mb-4">
          <Users className="mr-2 text-blue-600 animate-bounce" size={20} />
          <span>{missionState.completions} people have completed this task</span>
        </div>
        
        <div className="flex items-center mb-4">
          <Clock className="mr-2 text-blue-600" size={20} />
          <span>{missionState.status === 'ongoing' ? 'Ongoing' : 'Ended'} - Until {missionState.endTime}</span>
        </div>

        <div className="space-y-2">
          {missionState.tasks.map((task, index) => (
            <div key={index} className="transform transition-all duration-300 hover:scale-102">
              <button 
                onClick={() => toggleTaskExpansion(index)}
                className={`w-full py-2 px-4 rounded-md text-left flex justify-between items-center transition-colors duration-300 ${
                  task.completed 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
              >
                <span>{task.name}</span>
                <div className="flex items-center">
                  {task.completed && <Check className="text-green-600 mr-2 animate-bounce" size={20} />}
                  {task.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              {task.expanded && (
                <div className="mt-2 flex space-x-2 animate-slide-down">
                  <button 
                    onClick={() => handleGoTask(index)}
                    className={`flex-1 bg-blue-500 text-white py-1 px-3 rounded-md transition-all duration-300 ${
                      missionState.status === 'completed' 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-blue-600 hover:scale-105'
                    }`}
                    disabled={missionState.status === 'completed'}
                  >
                    Go
                  </button>
                  <button 
                    onClick={() => handleVerifyTask(index)}
                    className={`flex-1 py-1 px-3 rounded-md transition-all duration-300 ${
                      task.completed
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                    } hover:scale-105`}
                    disabled={task.completed || missionState.status === 'completed'}
                  >
                    {task.completed ? 'Verified' : 'Verify'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg transform transition-all duration-300 hover:scale-102">
          <h2 className="text-lg font-semibold mb-2">Countdown Timer:</h2>
          <div className="flex justify-between">
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <span className="text-2xl font-bold animate-pulse">{value}</span>
                <p className="text-sm">{unit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg transform transition-all duration-300 hover:scale-102">
          <h2 className="text-lg font-semibold mb-2">Total Reward:</h2>
          <p className="text-2xl font-bold text-yellow-600 animate-pulse">
            {missionState.totalReward.toFixed(4)} BTC
          </p>
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg transform transition-all duration-300 hover:scale-102">
          <h2 className="text-lg font-semibold mb-2">Current Prize Pool:</h2>
          <p className="text-2xl font-bold text-blue-600 animate-pulse">
            {missionState.currentPrizePool.toFixed(4)} BTC
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your Reward:</h2>
          <p className="text-2xl font-bold text-yellow-600 animate-pulse">
            {missionState.reward.toFixed(4)} BTC
          </p>
        </div>

        <button 
          onClick={handleClaimReward}
          className={`w-full mt-4 py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 ${
            missionState.status === 'completed'
              ? 'bg-green-600 text-white cursor-not-allowed'
              : allTasksCompleted
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          disabled={!allTasksCompleted || missionState.status === 'completed'}
        >
          {missionState.status === 'completed' ? 'Claimed' : allTasksCompleted ? 'Claim Reward' : 'Complete All Tasks to Claim'}
        </button>
      </div>

      {showClaimModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full animate-slide-up">
            <img 
              src="https://img.icons8.com/color/96/000000/dog.png" 
              alt="Dog" 
              className="w-24 h-24 mx-auto mb-4 animate-bounce"
            />
            <h3 className="text-xl font-bold text-center mb-4">
              {missionState.reward.toFixed(4)} BTC claimed!
            </h3>
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleCheckRewards}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-blue-600 hover:scale-105"
              >
                Check my rewards
              </button>
              <button
                onClick={handleCompleteOtherTasks}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-green-600 hover:scale-105"
              >
                Complete other tasks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionPage;