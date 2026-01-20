
import React, { useState, useEffect, useRef } from 'react';

const SCENES = [
  { 
    id: 'rain', 
    name: '雨夜深巷', 
    color: '#4A5D6D', 
    noise: 'https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3', // Rain noise
    music: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Ambient music
  },
  { 
    id: 'forest', 
    name: '晨曦森林', 
    color: '#6B8E23', 
    noise: 'https://assets.mixkit.co/active_storage/sfx/1230/1230-preview.mp3', // Forest noise
    music: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' // Bright acoustic
  },
  { 
    id: 'ocean', 
    name: '海浪沙滩', 
    color: '#3B7A91', 
    noise: 'https://assets.mixkit.co/active_storage/sfx/1234/1234-preview.mp3', // Ocean waves
    music: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' // Deep chill
  },
  { 
    id: 'fire', 
    name: '篝火噼啪', 
    color: '#FF7043', 
    noise: 'https://assets.mixkit.co/active_storage/sfx/1242/1242-preview.mp3', // Crackling fire
    music: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' // Warm guitar
  }
];

const MentalQuitting: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(180);
  const [volume, setVolume] = useState(0.4);
  const [isBreathingIn, setIsBreathingIn] = useState(true);
  const [activeScene, setActiveScene] = useState(SCENES[0]);

  const audioNoiseRef = useRef<HTMLAudioElement | null>(null);
  const audioMusicRef = useRef<HTMLAudioElement | null>(null);

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // Audio Control logic
  useEffect(() => {
    if (audioNoiseRef.current && audioMusicRef.current) {
      audioNoiseRef.current.volume = volume;
      audioMusicRef.current.volume = volume * 0.4; 
      if (isActive) {
        audioNoiseRef.current.play().catch(() => {});
        audioMusicRef.current.play().catch(() => {});
      } else {
        audioNoiseRef.current.pause();
        audioMusicRef.current.pause();
      }
    }
  }, [isActive, volume]);

  // Scene Change logic
  useEffect(() => {
    if (audioNoiseRef.current && audioMusicRef.current) {
      audioNoiseRef.current.src = activeScene.noise;
      audioMusicRef.current.src = activeScene.music;
      if (isActive) {
        audioNoiseRef.current.play().catch(() => {});
        audioMusicRef.current.play().catch(() => {});
      }
    }
  }, [activeScene]);

  // Breathing animation logic (4 seconds each half-cycle)
  useEffect(() => {
    if (!isActive) {
      setIsBreathingIn(true);
      return;
    };
    const breathInterval = setInterval(() => setIsBreathingIn(prev => !prev), 4000); 
    return () => clearInterval(breathInterval);
  }, [isActive]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6 py-4 animate-in fade-in duration-500 pb-24">
      {/* Audio elements */}
      <audio ref={audioNoiseRef} loop />
      <audio ref={audioMusicRef} loop />
      
      <div className="text-center">
        <h2 className="text-2xl serif font-bold mb-2">3分钟精神离职</h2>
        <p className="text-[11px] text-[#8E837D] uppercase tracking-widest italic">只有此刻，你完全属于你自己 🕊️</p>
      </div>

      {/* Main Breathing Circle Container */}
      <div 
        className="relative aspect-square w-full max-w-[240px] mx-auto rounded-full flex items-center justify-center overflow-hidden transition-all duration-[4000ms] shadow-inner" 
        style={{ 
          backgroundColor: isActive 
            ? (isBreathingIn ? activeScene.color + '25' : activeScene.color + '10') 
            : activeScene.color + '15' 
        }}
      >
        {/* The Pulsing Glow Layer */}
        <div 
          className="absolute rounded-full transition-all duration-[4000ms] ease-in-out" 
          style={{ 
            width: isBreathingIn && isActive ? '90%' : '50%', 
            height: isBreathingIn && isActive ? '90%' : '50%', 
            backgroundColor: activeScene.color + '30',
            filter: 'blur(30px)',
            opacity: isBreathingIn && isActive ? 0.8 : 0.4
          }} 
        />

        {/* The Text with Breathing Effect */}
        <div 
          className="z-10 text-center transition-all duration-[4000ms] ease-in-out"
          style={{
            transform: isBreathingIn && isActive ? 'scale(1.1)' : 'scale(1)',
            opacity: isBreathingIn && isActive ? 1 : 0.7
          }}
        >
          <div className="text-6xl font-light mb-2 font-mono tracking-tighter text-[#4A443F]">
            {formatTime(seconds)}
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A443F] font-bold">
            {isActive ? (isBreathingIn ? '吸气...' : '呼气...') : '闭上眼，按下开始'}
          </p>
        </div>
      </div>

      {/* Scene Selection Grid */}
      <div className="flex flex-col items-center gap-5 mt-4">
        <div className="grid grid-cols-2 gap-3 px-4 w-full">
          {SCENES.map(scene => (
            <button 
              key={scene.id} 
              onClick={() => setActiveScene(scene)} 
              className={`py-4 rounded-2xl text-[11px] font-bold transition-all border shadow-sm ${
                activeScene.id === scene.id 
                  ? 'bg-[#4A443F] text-white border-transparent' 
                  : 'bg-white/50 text-[#8E837D] border-white/40 hover:bg-white'
              }`}
            >
              {scene.name}
            </button>
          ))}
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-3 w-48 bg-white/40 px-4 py-2 rounded-full shadow-inner border border-white/40">
          <span className="text-xs">🔈</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))} 
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#A68D85]" 
          />
          <span className="text-xs">🔊</span>
        </div>
      </div>

      {/* Control Button */}
      <button 
        onClick={() => { if (seconds === 0) setSeconds(180); setIsActive(!isActive); }} 
        className={`mx-auto w-full max-w-xs h-16 text-white rounded-[2.5rem] shadow-xl flex items-center justify-center font-bold tracking-[0.2em] active:scale-95 transition-all mt-4 ${
          isActive ? 'bg-[#8E837D]' : 'bg-[#A68D85]'
        }`}
      >
        {isActive ? '结束休息' : '开始沉浸体验'}
      </button>
    </div>
  );
};

export default MentalQuitting;
