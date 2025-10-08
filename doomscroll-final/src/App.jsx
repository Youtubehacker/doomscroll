import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, BarChart3, Moon, Shield, ChevronRight } from 'lucide-react';

const PhoneFrame = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md h-[844px] bg-black rounded-[60px] shadow-2xl overflow-hidden border-[14px] border-gray-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

function DoomScrollApp() {
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
    const hours = data.sliderValue;
    const yearsLeft = 80 - data.age;
    const hoursInLife = yearsLeft * 365 * 16;
    const hoursWasted = hours * 365 * yearsLeft;
    const percentWasted = (hoursWasted / hoursInLife) * 100;
    const yearsWasted = hoursWasted / (365 * 24);
    const daysPerYear = hours * 365 / 24;

    return {
      hours,
      percent: percentWasted.toFixed(1),
      years: yearsWasted.toFixed(1),
      daysPerYear: daysPerYear.toFixed(0),
      hoursPerWeek: (hours * 7).toFixed(1)
    };
  };

  const stats = calculateWasted();

  const facts = [
    { icon: "🧠", text: "The average person spends 6.5 hours per day on their phone" },
    { icon: "⏰", text: "That's 45.5 hours per week—more time than a full-time job" },
    { icon: "📅", text: "Over 2,372 hours per year—that's 99 DAYS of your life" },
    { icon: "💀", text: "If you're 25 with 55 years left, that's 15 YEARS of your life" },
  ];

  useEffect(() => {
    if (screen === 2) {
      const text = "Let's find out exactly how much time you're really losing.";
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setTypedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 3) {
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % facts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 4) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setDemoHours((progress / 100) * 6.5);
        if (progress >= 100) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [screen]);

  if (screen === 1) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-500 rounded-full animate-pulse"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-md">
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center transform rotate-12 animate-bounce">
              <Clock className="w-12 h-12 text-white transform -rotate-12" />
            </div>
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            DoomScroll
          </h1>

          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            You're losing <span className="text-white font-bold">years of your life</span> to your phone.
          </p>

          <button
            onClick={() => nextScreen(2)}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">See How Much You've Lost</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <p className="text-gray-600 text-sm mt-6">
            It's worse than you think.
          </p>
        </div>
      </div>
    );
  }

  if (screen === 2) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
              {typedText}
              <span className="animate-pulse">|</span>
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-3 text-sm font-medium">
                What brings you here?
              </label>
              <input
                type="text"
                value={data.reason}
                onChange={(e) => setData({ ...data, reason: e.target.value })}
                placeholder="I waste too much time on..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-3 text-sm font-medium">
                How old are you?
              </label>
              <input
                type="number"
                value={data.age}
                onChange={(e) => setData({ ...data, age: parseInt(e.target.value) || 0 })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              onClick={() => nextScreen(3)}
              disabled={!data.reason || data.age < 10}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold py-4 rounded-xl transition-all disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 3) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-bounce">
              {facts[currentFactIndex].icon}
            </div>
            <p className="text-xl text-white leading-relaxed">
              {facts[currentFactIndex].text}
            </p>
          </div>

          <div className="flex gap-2 justify-center mb-8">
            {facts.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentFactIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => nextScreen(4)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Show Me My Numbers
          </button>
        </div>
      </div>
    );
  }

  if (screen === 4) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Let's see how you compare
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-gray-400 text-sm">Hours per day</span>
              <span className="text-5xl font-black text-white tabular-nums">
                {demoHours.toFixed(1)}
              </span>
            </div>

            <div className="h-4 bg-gray-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transition-all duration-75 rounded-full"
                style={{ width: `${(demoHours / 10) * 100}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>0h</span>
              <span>5h</span>
              <span>10h+</span>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <p className="text-gray-400 text-sm mb-2">Average person</p>
            <p className="text-2xl font-bold text-white">6.5 hours/day</p>
          </div>

          <button
            onClick={() => nextScreen(5)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Now Show Me Mine
          </button>
        </div>
      </div>
    );
  }

  if (screen === 5) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How many hours per day do you think you use your phone?
          </h2>

          <div className="mb-8">
            <div className="text-center mb-6">
              <span className="text-6xl font-black text-white tabular-nums">
                {data.hoursGuess}
              </span>
              <span className="text-2xl text-gray-400 ml-2">hours</span>
            </div>

            <div className="flex gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => setData({ ...data, hoursGuess: num })}
                  className={`flex-1 aspect-square rounded-xl font-bold text-lg transition-all ${
                    data.hoursGuess === num
                      ? 'bg-blue-600 text-white scale-110'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => nextScreen(6)}
            disabled={data.hoursGuess === 0}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold py-4 rounded-xl transition-all disabled:cursor-not-allowed"
          >
            Submit My Guess
          </button>
        </div>
      </div>
    );
  }

  if (screen === 6) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Now, what's the real number?
          </h2>

          <div className="mb-8">
            <div className="text-center mb-6">
              <span className="text-6xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent tabular-nums">
                {data.sliderValue}
              </span>
              <span className="text-2xl text-gray-400 ml-2">hours/day</span>
            </div>

            <input
              type="range"
              min="0"
              max="16"
              step="0.5"
              value={data.sliderValue}
              onChange={(e) => setData({ ...data, sliderValue: parseFloat(e.target.value) })}
              className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />

            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>0h</span>
              <span>8h</span>
              <span>16h</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
            <p className="text-gray-400 text-sm">
              {data.sliderValue < data.hoursGuess
                ? "Most people underestimate their screen time."
                : data.sliderValue === data.hoursGuess
                ? "Spot on! Let's see what that means."
                : "Wow, that's higher than you thought."}
            </p>
          </div>

          <button
            onClick={() => nextScreen(7)}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Show Me The Damage
          </button>
        </div>
      </div>
    );
  }

  if (screen === 7) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-black via-red-950/20 to-black flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">💀</div>
            <h2 className="text-3xl font-black text-white mb-2">
              Here's What You're Losing
            </h2>
            <p className="text-gray-400">Based on your {stats.hours} hours per day</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/30 rounded-xl p-6">
              <div className="text-5xl font-black text-white mb-2 tabular-nums">{stats.percent}%</div>
              <p className="text-gray-300">of your remaining waking life</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-4xl font-black text-red-400 mb-2 tabular-nums">{stats.years}</div>
              <p className="text-gray-300">years of your life</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-black text-white mb-1 tabular-nums">{stats.hoursPerWeek}</div>
                <p className="text-gray-400 text-sm">hours per week</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-black text-white mb-1 tabular-nums">{stats.daysPerYear}</div>
                <p className="text-gray-400 text-sm">days per year</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setScreen(8);
              setActiveTab('home');
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl transition-all"
          >
            Help Me Fix This
          </button>
        </div>
      </div>
    );
  }

  if (screen === 8) {
    return (
      <div className="relative w-full min-h-screen bg-black">
        {activeTab === 'home' && (
          <div className="p-6 pb-32">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Your Reality</h1>
                <p className="text-gray-400">Based on {stats.hours} hours per day</p>
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-red-500/30 rounded-2xl p-6 mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black text-white tabular-nums">{stats.percent}</span>
                  <span className="text-2xl text-gray-300">%</span>
                </div>
                <p className="text-gray-300 text-lg">of your remaining life wasted</p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 mb-6">
                <h3 className="text-white font-semibold mb-4">Time Lost Breakdown</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xl font-bold text-white mb-1 tabular-nums">{stats.years}</div>
                    <p className="text-gray-400 text-xs">Years</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xl font-bold text-white mb-1 tabular-nums">{stats.hoursPerWeek}</div>
                    <p className="text-gray-400 text-xs">Hrs/weekly avg</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xl font-bold text-white mb-1 tabular-nums">{stats.daysPerYear}</div>
                    <p className="text-gray-400 text-xs">Days wasted/year</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 mb-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  You're spending <span className="text-white font-semibold">{stats.hoursPerWeek} hours per week</span> on your phone.
                  That's enough time to read 3 chapters, cook a meal, or go for a run. But here we are.
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

              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">See Your Progress</h3>
                <p className="text-gray-300 text-sm mb-4">Slide to see how much time you could gain back</p>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400 text-sm">Reduce usage by:</span>
                      <span className="text-white font-semibold">40%</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-2/5 rounded-full"></div>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Time saved per year:</span>
                      <span className="text-2xl font-bold text-white tabular-nums">{Math.round(stats.daysPerYear * 0.4)} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Years of life regained:</span>
                      <span className="text-2xl font-bold text-green-400 tabular-nums">{(stats.years * 0.4).toFixed(1)} years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Smart Warnings</h4>
                      <p className="text-gray-400 text-sm">Get notified when you've been scrolling too long</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Moon size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Focus Zones</h4>
                      <p className="text-gray-400 text-sm">Block apps during work, sleep, or family time</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 size={20} className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Weekly Reports</h4>
                      <p className="text-gray-400 text-sm">Track improvements and celebrate wins</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap size={20} className="text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">App Limits</h4>
                      <p className="text-gray-400 text-sm">Set daily time limits for your worst apps</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center">
                <p className="text-white font-semibold mb-2">Coming Soon</p>
                <p className="text-blue-100 text-sm">We're building these features right now</p>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
          <div className="max-w-md mx-auto flex justify-around p-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <Target size={24} />
              <span className="text-xs">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'features' ? 'text-blue-500' : 'text-gray-400'}`}
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

  return null;
}

export default function App() {
  return (
    <PhoneFrame>
      <DoomScrollApp />
    </PhoneFrame>
  );
}