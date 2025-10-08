import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, BarChart3, Moon, Shield, ChevronRight } from 'lucide-react';

export default function DoomScrollApp() {
  const [screen, setScreen] = useState(1);
  const [activeTab, setActiveTab] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [demoHours, setDemoHours] = useState(6.5);
  const [data, setData] = useState({
    reason: '',
    age: 25,
    sliderValue: 50,
    hoursGuess: 0
  });

  const nextScreen = (next) => {
    setTimeout(() => setScreen(next), 150);
  };

  const calculateWasted = () => {
    const hoursPerDay = 6.5;
    const daysPerYear = Math.round((hoursPerDay * 365) / 24);
    const yearsRemaining = 80 - data.age;
    const yearsWasted = Math.round((hoursPerDay * 365 * yearsRemaining) / 8760);
    const minutesPerDay = hoursPerDay * 60;
    const pickupsPerDay = 147;
    const weeklyAverage = 6.2;
    return { hoursPerDay, daysPerYear, yearsWasted, yearsRemaining, minutesPerDay, pickupsPerDay, weeklyAverage };
  };

  const stats = calculateWasted();
  const doomScore = Math.min(100, Math.round(stats.hoursPerDay * 12));

  const topApps = [
    { name: 'TikTok', minutes: 156, color: 'bg-pink-500' },
    { name: 'Instagram', minutes: 98, color: 'bg-purple-500' },
    { name: 'Twitter', minutes: 67, color: 'bg-blue-500' },
    { name: 'Reddit', minutes: 45, color: 'bg-orange-500' }
  ];

  const weeklyData = [
    { day: 'Mon', hours: 5.2 },
    { day: 'Tue', hours: 7.1 },
    { day: 'Wed', hours: 6.8 },
    { day: 'Thu', hours: 8.2 },
    { day: 'Fri', hours: 6.5 },
    { day: 'Sat', hours: 9.1 },
    { day: 'Sun', hours: 7.8 }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const ScrollingIPhone = () => {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setScrollPos(prev => (prev + 1) % 200);
      }, 30);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative mx-auto" style={{ width: '180px', height: '360px' }}>
        <div className="absolute inset-0 bg-gray-900 rounded-[45px] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-b-3xl z-10"></div>
          
          <div className="absolute inset-4 bg-black rounded-[37px] overflow-hidden">
            <div 
              className="w-full"
              style={{ transform: `translateY(-${scrollPos}px)` }}
            >
              {[...Array(20)].map((_, i) => (
                <div key={i} className="p-3 border-b border-gray-800">
                  <div className="flex gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-2 bg-gray-800 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-700 rounded-full z-10"></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const texts = {
      1: "Find out how much of your life you're scrolling away",
      2: "Why are you here?",
      3: "How old are you?",
      5: "How many hours per day do you think you scroll?"
    };

    const textToType = texts[screen];
    if (!textToType) {
      setTypedText('');
      return;
    }

    setTypedText('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < textToType.length) {
        setTypedText(textToType.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [screen]);

  useEffect(() => {
    if (screen !== 4) return;

    const facts = [
      "The average person checks their phone 96 times per day",
      "Social media apps are designed to be as addictive as slot machines",
      "Heavy phone users get 70% less deep sleep than light users"
    ];

    setTypedText('');
    setCurrentFactIndex(0);
    
    let factIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (factIndex >= facts.length) return;
      
      if (charIndex < facts[factIndex].length) {
        setTypedText(facts[factIndex].slice(0, charIndex + 1));
        setCurrentFactIndex(factIndex);
        charIndex++;
        setTimeout(typeNextChar, 20);
      } else {
        setTimeout(() => {
          factIndex++;
          charIndex = 0;
          setTypedText('');
          typeNextChar();
        }, 1000);
      }
    };

    typeNextChar();
  }, [screen]);

  if (screen === 1) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <ScrollingIPhone />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">DoomScroll</h1>
          <p className="text-xl text-gray-400 mb-12 min-h-[4rem]">{typedText}</p>
          <button
            onClick={() => nextScreen(2)}
            className="w-full bg-white text-black py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  if (screen === 2) {
    const options = [
      { text: "I want to take back my time", color: "bg-emerald-500" },
      { text: "I want better sleep", color: "bg-blue-500" },
      { text: "I'm tired of feeling unproductive", color: "bg-purple-500" },
      { text: "I want to be more present", color: "bg-orange-500" },
      { text: "Just curious about my usage", color: "bg-gray-600" }
    ];

    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-8 min-h-[3rem]">{typedText}</h2>
          <div className="space-y-3">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setData({...data, reason: option.text});
                  nextScreen(3);
                }}
                className={`w-full ${option.color} text-white py-4 px-6 rounded-xl font-medium text-left transition-all transform hover:translate-x-2 hover:shadow-lg flex items-center justify-between group`}
              >
                <span>{option.text}</span>
                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 3) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-4 min-h-[3rem]">{typedText}</h2>
          <p className="text-gray-400 mb-8">We need this to calculate time wasted</p>
          
          <div className="mb-8">
            <div className="text-6xl font-bold text-white text-center mb-6">{data.age}</div>
            <input
              type="range"
              min="13"
              max="80"
              value={data.age}
              onChange={(e) => setData({...data, age: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((data.age-13)/(80-13))*100}%, #374151 ${((data.age-13)/(80-13))*100}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>13</span>
              <span>80</span>
            </div>
          </div>

          <button
            onClick={() => nextScreen(4)}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (screen === 4) {
    const facts = [
      "The average person checks their phone 96 times per day",
      "Social media apps are designed to be as addictive as slot machines",
      "Heavy phone users get 70% less deep sleep than light users"
    ];

    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-8">Did you know?</h2>
          <div className="space-y-4 mb-12">
            {facts.map((fact, idx) => (
              <div 
                key={idx} 
                className={`bg-gray-900 p-6 rounded-xl border transition-all duration-300 ${
                  idx <= currentFactIndex ? 'border-blue-500 opacity-100' : 'border-gray-800 opacity-30'
                }`}
              >
                <p className="text-white text-lg min-h-[4rem]">
                  {idx === currentFactIndex ? typedText : idx < currentFactIndex ? fact : ''}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => nextScreen(4.5)}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (screen === 4.5) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield size={48} className="text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">We need your permission</h2>
          <p className="text-gray-400 mb-8">
            To show you accurate screen time data, we need access to your Screen Time settings. Your data stays completely private.
          </p>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-semibold mb-1">Your data is private</p>
                <p className="text-gray-400 text-sm">We never share or sell your information</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-semibold mb-1">Read-only access</p>
                <p className="text-gray-400 text-sm">We only read your screen time data</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => nextScreen(5)}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 mb-3"
          >
            Grant Permission
          </button>
          <button
            onClick={() => nextScreen(5)}
            className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  if (screen === 5) {
    const comments = [
      "Not bad at all",
      "Pretty normal",
      "Getting concerning",
      "That's quite a bit...",
      "Okay, now we're worried",
      "This is pretty bad",
      "Seriously problematic",
      "You need help"
    ];
    
    const commentIndex = Math.floor((data.sliderValue / 100) * (comments.length - 1));

    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-4 min-h-[6rem]">{typedText}</h2>
          <p className="text-gray-400 mb-8">Just guess. We'll show you the truth...</p>
          
          <div className="mb-12">
            <div className="text-6xl font-bold text-white text-center mb-2">
              {Math.round((data.sliderValue / 100) * 10)}h
            </div>
            <p className="text-center text-gray-400 text-lg mb-6">{comments[commentIndex]}</p>
            
            <input
              type="range"
              min="0"
              max="100"
              value={data.sliderValue}
              onChange={(e) => setData({...data, sliderValue: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${data.sliderValue}%, #374151 ${data.sliderValue}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>0h</span>
              <span>10h</span>
            </div>
          </div>

          <button
            onClick={() => {
              setData({...data, hoursGuess: Math.round((data.sliderValue / 100) * 10)});
              nextScreen(6);
            }}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all transform hover:scale-105"
          >
            Show Me The Truth
          </button>
        </div>
      </div>
    );
  }

  if (screen === 6) {
    setTimeout(() => nextScreen(7), 2800);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 shadow-lg shadow-blue-500/50"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '1.5s' }}>
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 shadow-lg shadow-purple-500/50"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '1s' }}>
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-pink-500 rounded-full -translate-x-1/2 shadow-lg shadow-pink-500/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{ width: '60px', height: '100px' }}>
                <div className="absolute inset-0 bg-gray-800 rounded-[18px] border-[3px] border-gray-700">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-b-xl"></div>
                  <div className="absolute inset-1 bg-gray-900 rounded-[14px]"></div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Crunching the numbers...</h2>
          <p className="text-gray-400">This might hurt a bit</p>
        </div>
      </div>
    );
  }

  if (screen === 7) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-gray-500 mb-4">You thought</h2>
          <div className="text-4xl font-bold text-gray-400 mb-8">{data.hoursGuess} hours/day</div>
          
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-gray-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-4 text-gray-500 text-sm uppercase tracking-wide">The Truth</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500 rounded-2xl p-8 mb-8">
            <div className="text-7xl font-black text-red-500 mb-2">{stats.hoursPerDay}h</div>
            <p className="text-red-400 text-xl font-semibold">every single day</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8 space-y-3">
            <p className="text-gray-300 text-lg">
              That's <span className="text-red-400 font-bold">{stats.daysPerYear} full days</span> wasted per year
            </p>
            <p className="text-gray-300 text-lg">
              At this rate: <span className="text-red-400 font-bold">{stats.yearsWasted} years</span> of your life
            </p>
          </div>

          <button
            onClick={() => nextScreen(8)}
            className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-all transform hover:scale-105"
          >
            Show Me More
          </button>
        </div>
      </div>
    );
  }

  if (screen === 8) {
    const totalDots = stats.yearsRemaining;
    const wastedDots = stats.yearsWasted;
    
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-4">Your life remaining</h2>
          <p className="text-gray-400 mb-8">Each dot = 1 year. Red = wasted scrolling.</p>
          
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8">
            <div className="grid grid-cols-10 gap-2">
              {Array.from({length: totalDots}).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${idx < wastedDots ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-700'}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => nextScreen(9)}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            See My Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (screen === 9) {
    return (
      <div className="min-h-screen bg-black">
        {activeTab === 'home' && (
          <div className="p-6 pb-32">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Your Doom Score</h1>
                <div className="text-7xl font-bold text-red-500 my-6">{doomScore}</div>
                <p className="text-gray-400">
                  {doomScore < 40 ? "Not terrible" : doomScore < 70 ? "Pretty bad" : "Critical"}
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-4">
                <h3 className="text-lg font-bold text-white mb-4">Today's Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Clock size={16} />
                      Screen Time
                    </span>
                    <span className="text-white font-bold">{Math.floor(stats.hoursPerDay)} hours {Math.round((stats.hoursPerDay % 1) * 60)} mins</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Zap size={16} />
                      Pickups
                    </span>
                    <span className="text-white font-bold">{stats.pickupsPerDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Moon size={16} />
                      Late Night Sessions
                    </span>
                    <span className="text-white font-bold">3</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-4">
                <h3 className="text-lg font-bold text-white mb-4">Top Time Wasters</h3>
                <div className="space-y-3">
                  {topApps.map((app, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">{app.name}</span>
                        <span className="text-white font-bold">{app.minutes}m</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`${app.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(app.minutes / topApps[0].minutes) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-4">
                <h3 className="text-lg font-bold text-white mb-4">Last 7 Days</h3>
                <div className="flex items-end justify-between gap-2 mb-3" style={{ height: '128px' }}>
                  {weeklyData.map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-1">
                      <span className="text-xs text-white font-semibold">{day.hours}h</span>
                      <div 
                        className="w-full bg-blue-500 rounded-t transition-all duration-500"
                        style={{ 
                          height: `${(day.hours / maxHours) * 100}px`,
                          minHeight: '20px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">{day.day}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xl font-bold text-white mb-1">{stats.weeklyAverage}h</div>
                    <p className="text-gray-400 text-xs">Weekly avg</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xl font-bold text-white mb-1">{stats.daysPerYear}</div>
                    <p className="text-gray-400 text-xs">Days wasted/year</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-3">Today's Reality Check</h3>
                <p className="text-gray-300 mb-4">
                  You've spent {stats.minutesPerDay} minutes scrolling today. That's enough time to read 3 chapters, cook a meal, or go for a run. But here we are.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('features')}
                className="w-full mt-4 bg-blue-500/10 border border-blue-500/30 text-blue-400 py-4 rounded-xl font-medium hover:bg-blue-500/20 transition-all flex items-center justify-between px-6"
              >
                <span>See how we can help you improve</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="p-6 pb-32">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-white mb-2">What We'll Do For You</h2>
              <p className="text-gray-400 mb-6">Tools to help you take back your time</p>

              {/* Interactive Demo */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">See Your Progress</h3>
                <p className="text-gray-300 text-sm mb-4">Slide to see how your score improves as you scroll less</p>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Daily Screen Time</span>
                    <span className="text-white font-bold">{demoHours.toFixed(1)}h</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={demoHours}
                    onChange={(e) => setDemoHours(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${((10-demoHours)/9)*100}%, #374151 ${((10-demoHours)/9)*100}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1h (Great!)</span>
                    <span>10h (Bad)</span>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Doom Score</span>
                    <span className={`text-2xl font-bold ${demoHours < 3 ? 'text-green-400' : demoHours < 6 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {Math.round(demoHours * 12)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={`font-semibold ${demoHours < 3 ? 'text-green-400' : demoHours < 6 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {demoHours < 3 ? 'Excellent' : demoHours < 6 ? 'Needs Work' : 'Critical'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Weekly Streak</span>
                    <span className={`font-bold ${demoHours < 4 ? 'text-green-400' : demoHours < 7 ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {demoHours < 4 ? '7 days' : demoHours < 7 ? '3 days' : '0 days'}
                    </span>
                  </div>
                  {demoHours < 4 && (
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-sm text-green-400">You're on track to save {Math.round((6.5 - demoHours) * 365 / 24)} days this year</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Smart Warnings</h4>
                      <p className="text-gray-400 text-sm">Get notified when you're near your limit with custom messages</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target size={20} className="text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">App Blocking Rules</h4>
                      <p className="text-gray-400 text-sm">Set time limits and block apps during work hours or bedtime</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Home Screen Widget</h4>
                      <p className="text-gray-400 text-sm">Real-time doom score on your home screen to keep you accountable</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Moon size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Instant Alerts</h4>
                      <p className="text-gray-400 text-sm">Push notifications when you open time-wasting apps</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 size={20} className="text-pink-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Calendar View</h4>
                      <p className="text-gray-400 text-sm">Visualize your screen time patterns on a monthly calendar</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Preset Rules</h4>
                      <p className="text-gray-400 text-sm">Choose from templates: Study Mode, Sleep Mode, Work Focus</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-6 pb-32">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Analytics</h2>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-4">
                <h3 className="text-lg font-bold text-white mb-4">Weekly Average</h3>
                <div className="text-4xl font-bold text-blue-500 mb-2">{stats.weeklyAverage}h</div>
                <p className="text-gray-400">per day this week</p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-4">
                <h3 className="text-lg font-bold text-white mb-4">Last 7 Days</h3>
                <div className="flex items-end justify-between gap-2 h-32">
                  {weeklyData.map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end">
                      <div 
                        className="w-full bg-blue-500 rounded-t transition-all duration-500"
                        style={{ height: `${(day.hours / maxHours) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-2">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="text-2xl font-bold text-white mb-1">{stats.daysPerYear}</div>
                  <p className="text-gray-400 text-sm">Days wasted/year</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="text-2xl font-bold text-white mb-1">{stats.yearsWasted}</div>
                  <p className="text-gray-400 text-sm">Years of your life</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
          <div className="max-w-md mx-auto flex justify-around p-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <Target size={24} />
              <span className="text-xs">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'features' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <Zap size={24} />
              <span className="text-xs">Features</span>
            </button>
          </div>
          <button
            onClick={() => {
              setScreen(1);
              setActiveTab('home');
            }}
            className="text-gray-600 hover:text-gray-400 transition-colors text-xs pb-3 text-center w-full"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }
}