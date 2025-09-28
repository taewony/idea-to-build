'use client';

import { useState } from 'react';
import * as store from '@/lib/store';
import { CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState(store.getAiSettings());
  const [characters] = useState(store.getAvailableCharacters());

  const handleSetCharacter = (characterId: string) => {
    store.setAiCharacter(characterId);
    setSettings({ ...store.getAiSettings() });
  };

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">AI 비서 설정</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-2">현재 설정된 캐릭터</h2>
            <div className="flex items-center">
                <span className="text-6xl mr-4">{settings.character.avatar}</span>
                <div>
                    <h3 className="text-2xl font-bold text-indigo-600">{settings.character.name}</h3>
                    <p className="text-gray-600">{settings.character.description}</p>
                </div>
            </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">캐릭터 선택</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {characters.map(char => (
              <div 
                key={char.id} 
                onClick={() => handleSetCharacter(char.id)} 
                className={`p-4 rounded-lg shadow-md cursor-pointer border-4 ${settings.character.id === char.id ? 'border-indigo-500' : 'border-transparent'} bg-white`}
              >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-4xl mr-4">{char.avatar}</span>
                        <div>
                            <h4 className="font-bold text-lg">{char.name}</h4>
                            <p className="text-sm text-gray-500">{char.description}</p>
                        </div>
                    </div>
                    {settings.character.id === char.id && <CheckCircle className="text-indigo-500 h-8 w-8" />}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
  );
}
