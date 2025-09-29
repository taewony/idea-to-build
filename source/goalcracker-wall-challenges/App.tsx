
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Challenge, AIMessage } from './types';
import { CHALLENGES, AI_MESSAGES } from './constants';

// --- HELPER COMPONENTS (defined outside main components) ---

const Header: React.FC = () => {
    const location = useLocation();
    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? "text-sm font-medium text-primary font-semibold transition-colors"
            : "text-sm font-medium hover:text-primary transition-colors";
    };

    return (
        <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-4">
                        <div className="text-primary size-7">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">GoalCracker</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className={getLinkClass('/')} to="/">Challenges</Link>
                        <Link className={getLinkClass('/wall')} to="/wall">AI Wall</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">notifications</span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://picsum.photos/seed/avatar/100/100")` }}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => (
    <div className="group flex flex-col bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood hover:shadow-wood-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative w-full aspect-video">
            <img alt={challenge.category} className="w-full h-full object-cover" src={challenge.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white text-lg font-bold">{challenge.title}</h3>
                <p className="text-gray-200 text-sm">{challenge.subtitle}</p>
            </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
            <p className="text-sm text-text-light/90 dark:text-text-dark/90 flex-grow mb-4">{challenge.description.substring(0, 80)}...</p>
            <div className="mt-auto">
                {challenge.isUpcoming ? (
                    <button className="w-full bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-300 font-bold py-2 px-4 rounded-lg cursor-not-allowed" disabled>곧 시작</button>
                ) : (
                    <Link to={`/goal/${challenge.id}`} className="block text-center w-full bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors shadow-sm">
                        자세히 보기
                    </Link>
                )}
            </div>
        </div>
    </div>
);

interface AIMessageCardProps {
    message: AIMessage;
    challenge: Challenge | undefined;
}

const AIMessageCard: React.FC<AIMessageCardProps> = ({ message, challenge }) => {
    const isCritic = message.type === 'critic';
    const rotationClass = `transform rotate-${message.rotation < 0 ? `[${message.rotation}deg]` : message.rotation}`;
    
    return (
        <div className={`font-handwriting bg-white w-11/12 p-4 rounded-lg border border-gray-200 shadow-card transition-transform duration-200 ease-in-out hover:scale-102 ${rotationClass} ${isCritic ? '' : 'ml-auto'}`}>
             <div className={`flex items-start ${isCritic ? '' : 'flex-row-reverse'}`}>
                <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ring-2 ${isCritic ? 'bg-gray-700 ring-gray-300' : 'bg-yellow-400 ring-yellow-300'}`}>
                        {isCritic ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.293c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        )}
                    </div>
                </div>
                <div className={`flex-grow mx-4 ${isCritic ? 'text-left' : 'text-right'}`}>
                    <p className={`text-lg font-bold ${isCritic ? 'text-red-600' : 'text-blue-600'}`}>{message.title}</p>
                    <p className="text-gray-700 mt-2">{message.content}</p>
                     {challenge && (
                        <Link to={`/goal/${challenge.id}`} className="inline-flex items-center mt-3 text-sm font-bold text-accent hover:underline">
                           <span className="material-symbols-outlined mr-1 text-base">east</span>
                           연관 목표: {challenge.title}
                        </Link>
                    )}
                    <span className="text-xs text-gray-400 mt-1 block">{message.timestamp}</span>
                </div>
            </div>
        </div>
    );
};


// --- PAGE COMPONENTS ---

const ChallengesPage: React.FC = () => {
  const activeChallenges = CHALLENGES.filter(c => !c.isUpcoming);
  const upcomingChallenges = CHALLENGES.filter(c => c.isUpcoming);

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">공식 도전 과제</h1>
          <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">다른 사람들과 함께 목표를 달성하고 동기를 유지하세요.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">예정된 도전 과제</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

const WallPage: React.FC = () => {
    return (
        <main className="flex-grow py-8 px-4">
             <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">AI 잔소리 담벼락</h1>
                    <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">AI의 따끔한 충고와 따뜻한 격려를 확인해보세요.</p>
                </div>
                {AI_MESSAGES.map(message => {
                    const associatedChallenge = CHALLENGES.find(c => c.id === message.goalId);
                    return <AIMessageCard key={message.id} message={message} challenge={associatedChallenge} />
                })}
            </div>
        </main>
    );
};


const GoalDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        const foundChallenge = CHALLENGES.find(c => c.id === id) || null;
        setChallenge(foundChallenge);
    }, [id]);

    if (!challenge) {
        return <div className="text-center py-20">목표를 찾을 수 없습니다.</div>;
    }

    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="max-w-4xl mx-auto bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood-lg overflow-hidden">
                <div className="relative">
                    <img className="w-full h-64 object-cover" src={challenge.image} alt={challenge.title} />
                    <div className="absolute inset-0 bg-black/40"></div>
                     <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="absolute bottom-6 left-6 text-white">
                        <span className="bg-accent/80 text-xs font-bold px-2 py-1 rounded">{challenge.category}</span>
                        <h1 className="text-4xl font-bold mt-2">{challenge.title}</h1>
                        <p className="text-lg">{challenge.subtitle}</p>
                    </div>
                </div>
                <div className="p-8">
                    <p className="text-text-light dark:text-text-dark text-base leading-relaxed mb-8">
                        {challenge.description}
                    </p>
                    <button 
                      onClick={() => alert(`'${challenge.title}' 목표를 시작합니다! 이제 당신의 목표입니다.`)}
                      className="w-full bg-primary text-white text-xl font-bold py-4 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">bolt</span>
                        Cracking! (내 목표로 삼기)
                    </button>
                </div>
             </div>
        </main>
    );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className="flex flex-col min-h-screen bg-background-light/90 dark:bg-background-dark/90">
                <Header />
                <Routes>
                    <Route path="/" element={<ChallengesPage />} />
                    <Route path="/wall" element={<WallPage />} />
                    <Route path="/goal/:id" element={<GoalDetailPage />} />
                </Routes>
            </div>
        </HashRouter>
    );
};

export default App;
