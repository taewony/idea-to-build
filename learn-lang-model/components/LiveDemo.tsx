'use client'

import React, { useState } from 'react';
import { translateAndExplain } from '@/lib/geminiService';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

export default function LiveDemo() {
    const defaultPrompt = "Translate to Korean:\nExplain LLM attention in one paragraph.";
    const [prompt, setPrompt] = useState<string>(defaultPrompt);
    const [response, setResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRun = async () => {
        setIsLoading(true);
        setResponse('');
        const result = await translateAndExplain(prompt);
        setResponse(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-slate-900/50 rounded-2xl p-6 shadow-2xl shadow-slate-900/20 border border-slate-800">
            <div className="rounded-lg">
                <div className="text-sm text-slate-400">Live demo</div>
                <div className="mt-3 p-4 bg-slate-800/50 rounded-lg">
                    <label className="block text-xs text-slate-400">Prompt</label>
                    <textarea
                        className="mt-2 w-full min-h-[80px] rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 resize-none ring-offset-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-slate-500">Model: gemini-1.5-flash</div>
                        <button
                            onClick={handleRun}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-50 text-slate-900 hover:bg-slate-50/90 h-9 px-4 py-2"
                        >
                            {isLoading ? 'Running...' : 'Run'}
                        </button>
                    </div>
                </div>

                {(isLoading || response) && (
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                        <label className="block text-xs text-slate-400">Result</label>
                        <div className="mt-2 text-sm text-slate-300 whitespace-pre-wrap min-h-[50px]">
                            {isLoading ? <LoadingSpinner /> : response}
                        </div>
                    </div>
                )}
                
                <div className="mt-4 text-sm text-slate-500 text-center">프롬프트를 입력하고 실행해서 결과를 체험해보세요.</div>
            </div>
        </div>
    );
}