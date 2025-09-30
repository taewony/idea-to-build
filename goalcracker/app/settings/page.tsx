'use client';

import { useState, useEffect, useRef } from 'react';
import { useGoalCrackerStore } from '@/lib/store';
import { AIPersona, AISettings } from '@/lib/types';

const personaMap: { [key in AIPersona]: { name: string; icon: string; } } = {
  critic: { name: '냉혹한 비판가', icon: '🧐' },
  swearer: { name: '험악한 욕쟁이', icon: '🤬' },
  realist: { name: '현실적 조언가', icon: '🤖' },
};

const toneToTemp = (tone: AISettings['tone']) => {
    switch (tone) {
        case 'gentle': return 15;
        case 'normal': return 50;
        case 'harsh': return 85;
        default: return 50;
    }
};

const tempToTone = (temp: number): AISettings['tone'] => {
    if (temp < 34) return 'gentle';
    if (temp < 67) return 'normal';
    return 'harsh';
};

export default function SettingsPage() {
  const { aiSettings, updateAISettings } = useGoalCrackerStore();
  const [temperature, setTemperature] = useState(() => toneToTemp(aiSettings.tone));

  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handlePersonaChange = (persona: AIPersona) => {
    updateAISettings({ persona });
  };

  const handleSave = () => {
    alert("설정이 저장되었습니다!");
  };

  const calculateTemperature = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let percentage = Math.round((x / width) * 100);
    
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    setTemperature(percentage);
    const newTone = tempToTone(percentage);
    if (newTone !== aiSettings.tone) {
        updateAISettings({ tone: newTone });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      isDragging.current = true;
      calculateTemperature(e.clientX);
  };

  useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
          if (!isDragging.current) return;
          e.preventDefault();
          calculateTemperature(e.clientX);
      };

      const handleMouseUp = () => {
          isDragging.current = false;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  }, [aiSettings.tone]); // Re-add if needed

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">AI 비서 설정</h1>
          <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">AI의 성격과 말투를 취향에 맞게 조절하세요.</p>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-wood p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI 캐릭터 선택</h3>
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(personaMap) as AIPersona[]).map((persona) => (
                <button 
                  key={persona} 
                  onClick={() => handlePersonaChange(persona)} 
                  className={`p-4 rounded-lg text-center border-4 transition-colors ${aiSettings.persona === persona ? 'border-accent' : 'border-transparent hover:border-accent/50'}`}>
                  <span className="text-4xl">{personaMap[persona].icon}</span>
                  <p className="font-bold mt-2">{personaMap[persona].name}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">잔소리 톤 설정</h3>
            <div className="pt-8">
                <div 
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    className="relative w-full h-3 bg-gradient-to-r from-blue-400 to-red-500 rounded-full cursor-pointer touch-none"
                >
                    <div 
                        style={{ left: `${temperature}%` }}
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 select-none transition-all duration-100"
                    >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-dark text-text-light px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
                            {temperature}°C
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-text-dark"></div>
                        </div>
                        <div className="w-full h-full bg-white rounded-full shadow-md border-2 border-gray-200"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm text-text-light/80 dark:text-text-dark/80 px-1 mt-4">
                    <span>차갑게 (0°C)</span>
                    <span>뜨겁게 (100°C)</span>
                </div>
            </div>
          </div>
          <button onClick={handleSave} className="w-full bg-primary text-white text-lg font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg">설정 저장하기</button>
        </div>
      </div>
    </main>
  );
}
