
import React from 'react';

const ShowcaseSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
        <div className="p-6 bg-white dark:bg-gray-800/20 rounded-xl border border-gray-200 dark:border-gray-700/50 flex flex-wrap items-center gap-4">
            {children}
        </div>
    </div>
);

const ButtonsShowcase: React.FC = () => {
    return (
        <div className="w-full">
            <div className="mb-12 border-b border-gray-200 dark:border-gray-700/50 pb-6">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">Buttons</h1>
                <p className="mt-2 max-w-2xl text-base text-gray-500 dark:text-gray-400">
                    Buttons are used to trigger actions and events. They can be styled in various ways to indicate their purpose and hierarchy on the page.
                </p>
            </div>
            <div className="space-y-12">
                <ShowcaseSection title="Primary Buttons">
                    <button className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark">
                        Primary Action
                    </button>
                    <button className="px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-300 dark:hover:bg-slate-600">
                        Secondary Action
                    </button>
                </ShowcaseSection>

                <ShowcaseSection title="Secondary Buttons">
                    <button className="px-5 py-2.5 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-semibold text-sm hover:bg-primary/20 dark:hover:bg-primary/30">
                        Submit
                    </button>
                    <button className="px-5 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                        Learn More
                    </button>
                </ShowcaseSection>

                <ShowcaseSection title="Tertiary / Link Buttons">
                    <button className="px-5 py-2.5 rounded-lg text-primary font-semibold text-sm hover:underline">
                        View Details
                    </button>
                </ShowcaseSection>

                <ShowcaseSection title="Buttons with Icons">
                     <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary/90">
                        <span className="material-symbols-outlined text-base">add</span>
                        Create New
                    </button>
                     <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-300 dark:hover:bg-slate-600">
                        <span className="material-symbols-outlined text-base">cloud_upload</span>
                        Upload File
                    </button>
                </ShowcaseSection>

                <ShowcaseSection title="Disabled Buttons">
                    <button disabled className="px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-sm cursor-not-allowed">
                        Disabled Primary
                    </button>
                    <button disabled className="px-5 py-2.5 rounded-lg text-slate-400 dark:text-slate-600 font-semibold text-sm cursor-not-allowed">
                        Disabled Secondary
                    </button>
                </ShowcaseSection>
            </div>
        </div>
    );
};

export default ButtonsShowcase;
