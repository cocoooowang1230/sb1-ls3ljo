import React, { useState } from 'react';
import { Home, Database, X, ChevronRight, ArrowDown, ChevronDown, Award, Star, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CompletedTask {
  id: number;
  title: string;
  provider: string;
  reward: number;
  imageUrl: string;
}

const completedTasks: CompletedTask[] = [
  { id: 1, title: "首要任務：身份驗證", provider: "Twin3", reward: 0.03, imageUrl: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
  { id: 2, title: "Welcome to Bitdog", provider: "Bitdog", reward: 0.01, imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
  { id: 3, title: "Doff Earbuds", provider: "Doff", reward: 0.05, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
  { id: 4, title: "Summer Collection", provider: "Fashion Brand", reward: 0.02, imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
];

const MyTokenPage: React.FC = () => {
  const navigate = useNavigate();
  const [btcAmount, setBtcAmount] = useState(0.0001);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapAmount, setSwapAmount] = useState('');
  const [swapTo, setSwapTo] = useState('LTC');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOpenSwapModal = () => {
    setShowSwapModal(true);
  };

  const handleCloseSwapModal = () => {
    setShowSwapModal(false);
    setSwapAmount('');
  };

  const handleSwapAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value) <= btcAmount) {
      setSwapAmount(value);
    }
  };

  const handleSwapToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSwapTo(e.target.value);
  };

  const handleSwap = () => {
    setShowSwapModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmSwap = () => {
    setBtcAmount(prevAmount => prevAmount - parseFloat(swapAmount));
    setShowConfirmModal(false);
    setSwapAmount('');
  };

  const handleTaskClick = (taskId: number) => {
    navigate(`/mission/${taskId}`, { state: { fromHistory: true } });
  };

  return (
    <div className="max-w-md mx-auto bg-custom-beige min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img 
              src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" 
              alt="User" 
              className="w-12 h-12 rounded-full mr-4 animate-float" 
            />
            <div>
              <h2 className="text-xl font-bold">Alex Smit</h2>
              <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Award className="text-yellow-500 animate-float" size={24} />
            <Star className="text-yellow-500 animate-float" size={24} />
            <FileText className="text-blue-500 animate-float" size={24} />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">My BTC:</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold animate-pulse">{btcAmount.toFixed(4)} BTC</span>
            <span className="text-gray-500">= {(btcAmount * 218.67).toFixed(2)} TWD</span>
          </div>
        </div>
        <button
          onClick={handleOpenSwapModal}
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-pink-600 hover:scale-105"
        >
          Withdraw
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
        <h3 className="text-lg font-semibold mb-4">History Tasks</h3>
        <div className="grid grid-cols-2 gap-4 stagger-animate">
          {completedTasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg" 
              onClick={() => handleTaskClick(task.id)}
            >
              <img src={task.imageUrl} alt={task.title} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
                <p className="text-xs text-gray-600 mb-1">{task.provider}</p>
                <p className="text-sm font-bold text-yellow-600 animate-pulse">{task.reward.toFixed(3)} BTC</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Swap Crypto</h3>
              <button onClick={handleCloseSwapModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">From (BTC)</label>
              <input
                type="number"
                value={swapAmount}
                onChange={handleSwapAmountChange}
                max={btcAmount}
                className="w-full p-2 border rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                placeholder="0.0000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={swapTo}
                onChange={handleSwapToChange}
                className="w-full p-2 border rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="LTC">LTC</option>
                <option value="ETH">ETH</option>
                <option value="USD">USD</option>
                <option value="TWD">TWD</option>
              </select>
            </div>
            <button
              onClick={handleSwap}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-blue-600 hover:scale-105"
            >
              Swap
            </button>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full animate-slide-up">
            <h3 className="text-xl font-bold mb-4">Confirm Swap Info</h3>
            <div className="mb-4">
              <p>Slippage Tolerance: 2%</p>
              <p>Network Fee: 0.00000001 BTC</p>
              <p>You will receive: {swapAmount} {swapTo}</p>
            </div>
            <button
              onClick={handleConfirmSwap}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-blue-600 hover:scale-105"
            >
              Confirm Swap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTokenPage;