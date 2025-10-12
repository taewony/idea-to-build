
import React from 'react';

const InputField: React.FC<{ label: string; placeholder: string; type?: string; state?: 'default' | 'focus' | 'disabled'; icon?: string }> = ({ label, placeholder, type = "text", state = 'default', icon }) => {
  const stateClasses = {
    default: "border-slate-300 dark:border-slate-700",
    focus: "border-primary/80 ring-2 ring-primary/50",
    disabled: "bg-slate-100 dark:bg-slate-800 cursor-not-allowed text-slate-400 dark:text-slate-500"
  };

  const inputId = `input-${label.toLowerCase().replace(' ', '-')}`;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <div className="relative">
        {icon && <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800/60 focus:outline-none transition-shadow ${stateClasses[state]} ${icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
};

const InputsShowcase: React.FC = () => {
    return (
        <div className="w-full">
            <div className="mb-12 border-b border-gray-200 dark:border-gray-700/50 pb-6">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">Inputs</h1>
                <p className="mt-2 max-w-2xl text-base text-gray-500 dark:text-gray-400">
                    Input fields allow users to enter and edit text. This showcase demonstrates various states and styles for text inputs.
                </p>
            </div>
            <div className="space-y-12">
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Input States</h3>
                    <div className="p-6 bg-white dark:bg-gray-800/20 rounded-xl border border-gray-200 dark:border-gray-700/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <InputField label="Default State" placeholder="Enter your name" />
                            <InputField label="Focus State" placeholder="Click here" state="focus" />
                            <InputField label="Disabled State" placeholder="Cannot edit" state="disabled" />
                        </div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Input Types and Variations</h3>
                    <div className="p-6 bg-white dark:bg-gray-800/20 rounded-xl border border-gray-200 dark:border-gray-700/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Email Input" placeholder="you@example.com" type="email" icon="mail" />
                            <InputField label="Password Input" placeholder="••••••••" type="password" icon="lock" />
                             <div className="md:col-span-2">
                                <label htmlFor="textarea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Textarea</label>
                                <textarea 
                                    id="textarea" 
                                    rows={4} 
                                    placeholder="Enter a long message..."
                                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800/60 focus:outline-none transition-shadow border-slate-300 dark:border-slate-700 focus:border-primary/80 focus:ring-2 focus:ring-primary/50"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputsShowcase;
