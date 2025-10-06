
import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md relative transform scale-95 hover:scale-100 transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login Required</h2>
        <p className="text-slate-400 text-center mb-6">
          Please log in to use the AI-powered detailed view and get personalized recommendations.
        </p>
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Username</label>
                <input type="text" placeholder="user123" disabled className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-slate-400 cursor-not-allowed"/>
            </div>
            <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Password</label>
                <input type="password" placeholder="••••••••" disabled className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-slate-400 cursor-not-allowed"/>
            </div>
        </div>
        <p className="text-xs text-slate-500 text-center mt-4">(This is a demo. Just click Login to proceed.)</p>
        <button
          onClick={onLogin}
          className="w-full mt-6 py-3 px-4 bg-cyan-500 text-slate-900 font-semibold rounded-md hover:bg-cyan-400 transition-colors duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};
