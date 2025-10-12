
import React from 'react';

const Card: React.FC<{ imageUrl: string; title: string; description: string; className?: string }> = ({
    imageUrl,
    title,
    description,
    className = ''
}) => {
    return (
        <div className={`bg-white dark:bg-gray-800/40 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700/50 ${className}`}>
            <img alt={title} className="w-full h-40 object-cover" src={imageUrl} />
            <div className="p-5">
                <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h5>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>
                 <button className="mt-4 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-semibold text-sm hover:bg-primary/20 dark:hover:bg-primary/30">
                    Read More
                </button>
            </div>
        </div>
    );
};


const CardsShowcase: React.FC = () => {
    return (
        <div className="w-full">
            <div className="mb-12 border-b border-gray-200 dark:border-gray-700/50 pb-6">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">Cards</h1>
                <p className="mt-2 max-w-2xl text-base text-gray-500 dark:text-gray-400">
                    Cards are used to group related information into a flexible and extensible content container.
                </p>
            </div>
             <div className="p-6 bg-white dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700/50">
                <div className="@container/cards">
                    <div className="grid grid-cols-1 @[480px]/cards:grid-cols-2 @[1024px]/cards:grid-cols-3 gap-6">
                       <Card 
                            imageUrl="https://picsum.photos/id/1018/400/300" 
                            title="Mountain Vista" 
                            description="A stunning view of mountains at sunrise."
                        />
                        <Card 
                            imageUrl="https://picsum.photos/id/1015/400/300"
                            title="Coastal Retreat"
                            description="Relaxing waves on a sandy shore."
                        />
                       <Card 
                            imageUrl="https://picsum.photos/id/1025/400/300" 
                            title="City Life" 
                            description="The vibrant pulse of an urban landscape."
                            className="@[480px]/cards:col-span-2 @[1024px]/cards:col-span-1"
                        />
                         <Card 
                            imageUrl="https://picsum.photos/id/103/400/300"
                            title="Forest Trail"
                            description="Explore the tranquility of the deep woods."
                        />
                         <Card 
                            imageUrl="https://picsum.photos/id/1043/400/300"
                            title="Desert Dunes"
                            description="The stark beauty of the arid desert."
                        />
                         <Card 
                            imageUrl="https://picsum.photos/id/1044/400/300"
                            title="Architectural Wonder"
                            description="Modern design meets classic aesthetics."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsShowcase;
