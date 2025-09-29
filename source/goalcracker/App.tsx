import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Challenge, AIMessage, UserGoal, Task, CommunityPost, AISettings, AIPersona } from './types';
import { CHALLENGES, AI_MESSAGES, MY_GOALS, TASKS, COMMUNITY_POSTS, DEFAULT_AI_SETTINGS, AI_NUDGE_MESSAGES } from './constants';

// --- HELPER COMPONENTS ---

const Header: React.FC = () => {
    const location = useLocation();
    const getLinkClass = (path: string) => {
        const baseClass = "text-sm font-medium transition-colors";
        const activeClass = "text-primary font-semibold";
        const inactiveClass = "hover:text-primary";
        
        if (path === '/' && location.pathname === '/') return `${baseClass} ${activeClass}`;
        if (path !== '/' && location.pathname.startsWith(path)) return `${baseClass} ${activeClass}`;
        
        return `${baseClass} ${inactiveClass}`;
    };

    return (
        <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-4">
                        <div className="text-primary size-7">
                           <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path></svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">GoalCracker</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className={getLinkClass('/')} to="/">Home</Link>
                        <Link className={getLinkClass('/goals')} to="/goals">My Goals</Link>
                        <Link className={getLinkClass('/challenges')} to="/challenges">Challenges</Link>
                        <Link className={getLinkClass('/wall')} to="/wall">AI Wall</Link>
                        <Link className={getLinkClass('/settings')} to="/settings">AI Settings</Link>
                        <Link className={getLinkClass('/community')} to="/community">Community</Link>
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

interface AIResponseMessageModalProps {
  content: { title: string; content: string; persona: AIPersona; goalId: string } | null;
  onClose: () => void;
  onPostToWall: () => void;
}

const AIResponseMessageModal: React.FC<AIResponseMessageModalProps> = ({ content, onClose, onPostToWall }) => {
    if (!content) return null;

    const personaIcon = {
        critic: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
        swearer: <span className="material-symbols-outlined text-4xl text-white">sentiment_extremely_dissatisfied</span>,
        realist: <span className="material-symbols-outlined text-4xl text-white">neurology</span>
    };
    
    const personaColor = {
        critic: 'bg-red-500',
        swearer: 'bg-purple-600',
        realist: 'bg-green-500'
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative bg-white dark:bg-card-dark rounded-xl shadow-xl w-full max-w-md p-6 text-center" onClick={e => e.stopPropagation()}>
                 <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center -mt-16 ring-4 ring-white dark:ring-card-dark ${personaColor[content.persona]}`}>
                    {personaIcon[content.persona]}
                 </div>
                <h3 className="text-2xl font-bold mt-4 text-text-light dark:text-text-dark">{content.title}</h3>
                <p className="mt-2 text-text-light/80 dark:text-text-dark/80">{content.content}</p>
                <button onClick={onPostToWall} className="mt-6 w-full bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors">
                    AI 메시지 담벼락에 게시
                </button>
            </div>
        </div>
    );
};


// --- PAGE COMPONENTS ---
const HomePage: React.FC = () => {
    return (
        <main className="flex-grow">
            <div className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/home/1920/1080')` }}></div>
                <div className="absolute inset-0 bg-primary/50"></div>
                <div className="relative z-10 p-8">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-lg">목표를 깨부수는 즐거움</h1>
                    <p className="mt-4 text-xl md:text-2xl font-medium max-w-2xl mx-auto drop-shadow-md">GoalCracker와 함께라면, 어떤 목표든 달성할 수 있습니다. AI의 도움으로 당신의 잠재력을 폭발시키세요.</p>
                    <Link to="/challenges" className="mt-8 inline-block bg-accent text-white text-lg font-bold py-3 px-8 rounded-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-110 shadow-xl">
                        도전 시작하기
                    </Link>
                </div>
            </div>
        </main>
    );
};

const ChallengesPage: React.FC = () => {
  const activeChallenges = CHALLENGES.filter(c => !c.isUpcoming);
  const upcomingChallenges = CHALLENGES.filter(c => c.isUpcoming);
  
  const ChallengeCard: React.FC<{challenge: Challenge}> = ({ challenge }) => (
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
            <div className="flex items-center gap-4 text-sm text-text-light/80 dark:text-text-dark/80 mb-4">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">groups</span>
                <span>{challenge.participantCount.toLocaleString()}명 참여</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">favorite</span>
                <span>{challenge.interestCount.toLocaleString()}명 관심</span>
              </div>
            </div>
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

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">공식 도전 과제</h1>
          <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">다른 사람들과 함께 목표를 달성하고 동기를 유지하세요.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}
        </div>
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">예정된 도전 과제</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}
          </div>
        </div>
      </div>
    </main>
  );
};

const MyGoalsPage: React.FC<{ myGoals: UserGoal[], tasks: Task[] }> = ({ myGoals, tasks }) => {
    
    const getGoalProgress = (goalId: string) => {
        const goalTasks = tasks.filter(t => t.goalId === goalId);
        if (goalTasks.length === 0) return 0;
        const completedTasks = goalTasks.filter(t => t.isCompleted).length;
        return Math.round((completedTasks / goalTasks.length) * 100);
    };

    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">나의 목표</h1>
                    <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">현재 진행 중인 목표를 확인하고 관리하세요.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myGoals.map(goal => {
                        const progress = getGoalProgress(goal.id);
                        return (
                             <Link to={`/goals/${goal.id}/tasks`} key={goal.id} className="group flex flex-col bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood hover:shadow-wood-lg transition-all duration-300 hover:-translate-y-1 p-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{goal.title}</h3>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${goal.isPersonal ? 'bg-primary' : 'bg-accent'}`}>{goal.isPersonal ? '개인' : '공식'}</span>
                                </div>
                                <p className="text-sm text-text-light/80 dark:text-text-dark/80 mb-4 h-10">{goal.description}</p>
                                <div className="flex items-center gap-4 text-xs text-text-light/80 dark:text-text-dark/80 mb-4">
                                  <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">groups</span>
                                    <span>{goal.participantCount.toLocaleString()}명</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">favorite</span>
                                    <span>{goal.interestCount.toLocaleString()}명</span>
                                  </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-text-light dark:text-text-dark">진행률</span>
                                        <span className="text-sm font-medium text-text-light dark:text-text-dark">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-background-light dark:bg-background-dark rounded-full h-2.5">
                                        <div className="bg-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                             </Link>
                        );
                    })}
                     <div className="flex items-center justify-center bg-transparent border-4 border-dashed border-card-light dark:border-card-dark rounded-xl hover:bg-card-light/40 dark:hover:bg-card-dark/40 transition-colors cursor-pointer">
                        <div className="text-center p-6">
                            <span className="material-symbols-outlined text-5xl text-accent">add_circle</span>
                            <p className="mt-2 font-bold text-text-light dark:text-text-dark">새 목표 추가하기</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

const GoalTasksPage: React.FC<{ myGoals: UserGoal[], tasks: Task[], onNudge: (goalId: string) => void }> = ({ myGoals, tasks, onNudge }) => {
    const { id } = useParams<{ id: string }>();
    const goal = myGoals.find(g => g.id === id);
    const goalTasks = tasks.filter(t => t.goalId === id);

    if (!goal) return <div className="text-center py-20">목표를 찾을 수 없습니다.</div>;
    
    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">{goal.title}</h1>
                    <p className="mt-2 text-lg text-text-light/80 dark:text-text-dark/80">{goal.description}</p>
                </div>
                <div className="bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">할 일 목록</h2>
                      <button onClick={() => onNudge(goal.id)} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">auto_awesome</span>
                        AI Nudge
                      </button>
                    </div>
                    <ul className="space-y-3">
                        {goalTasks.map(task => (
                            <li key={task.id} className="flex items-center bg-background-light dark:bg-background-dark p-3 rounded-lg">
                                <input type="checkbox" checked={task.isCompleted} readOnly className="h-5 w-5 rounded border-gray-300 text-accent focus:ring-accent" />
                                <span className={`ml-3 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>{task.content}</span>
                            </li>
                        ))}
                    </ul>
                     <div className="mt-6 flex gap-2">
                        <input type="text" placeholder="새로운 할 일 추가..." className="flex-grow bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-accent focus:border-accent" />
                        <button className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/90">추가</button>
                    </div>
                </div>
            </div>
        </main>
    );
};


const WallPage: React.FC<{messages: AIMessage[]}> = ({ messages }) => {
    const AIMessageCard: React.FC<{ message: AIMessage; challenge: Challenge | undefined; }> = ({ message, challenge }) => {
        const isCritic = message.type === 'critic';
        const rotationClass = `transform rotate-${message.rotation < 0 ? `[${message.rotation}deg]` : message.rotation}`;
        return (
            <div className={`font-handwriting bg-white w-11/12 p-4 rounded-lg border border-gray-200 shadow-card transition-transform duration-200 ease-in-out hover:scale-102 ${rotationClass} ${isCritic ? '' : 'ml-auto'}`}>
                <div className={`flex items-start ${isCritic ? '' : 'flex-row-reverse'}`}>
                    <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ring-2 ${isCritic ? 'bg-gray-700 ring-gray-300' : 'bg-purple-600 ring-purple-400'}`}>
                            {isCritic ? <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg> : <span className="material-symbols-outlined text-4xl text-white">sentiment_extremely_dissatisfied</span>}
                        </div>
                    </div>
                    <div className={`flex-grow mx-4 ${isCritic ? 'text-left' : 'text-right'}`}>
                        <p className={`text-lg font-bold ${isCritic ? 'text-red-600' : 'text-purple-700'}`}>{message.title}</p>
                        <p className="text-gray-700 mt-2">{message.content}</p>
                        {challenge && <Link to={`/goal/${challenge.id}`} className="inline-flex items-center mt-3 text-sm font-bold text-accent hover:underline"><span className="material-symbols-outlined mr-1 text-base">east</span>연관 목표: {challenge.title}</Link>}
                        <span className="text-xs text-gray-400 mt-1 block">{message.timestamp}</span>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <main className="flex-grow py-8 px-4">
             <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">AI 잔소리 담벼락</h1>
                    <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">AI의 따끔한 충고와 따뜻한 격려를 확인해보세요.</p>
                </div>
                {messages.map(message => {
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
    const challenge = CHALLENGES.find(c => c.id === id) || null;

    if (!challenge) return <div className="text-center py-20">목표를 찾을 수 없습니다.</div>;

    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="max-w-4xl mx-auto bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood-lg overflow-hidden">
                <div className="relative">
                    <img className="w-full h-64 object-cover" src={challenge.image} alt={challenge.title} />
                    <div className="absolute inset-0 bg-black/40"></div>
                     <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition-colors z-10">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="absolute bottom-6 left-6 text-white z-10">
                        <span className="bg-accent/80 text-xs font-bold px-2 py-1 rounded">{challenge.category}</span>
                        <h1 className="text-4xl font-bold mt-2">{challenge.title}</h1>
                        <p className="text-lg">{challenge.subtitle}</p>
                    </div>
                </div>
                <div className="p-8">
                    <p className="text-text-light dark:text-text-dark text-base leading-relaxed mb-8">{challenge.description}</p>
                    <button onClick={() => alert(`'${challenge.title}' 목표를 시작합니다! 이제 당신의 목표입니다.`)} className="w-full bg-primary text-white text-xl font-bold py-4 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">bolt</span>Cracking! (내 목표로 삼기)
                    </button>
                </div>
             </div>
        </main>
    );
};

const SettingsPage: React.FC<{ settings: AISettings, onSettingsChange: (newSettings: AISettings) => void }> = ({ settings, onSettingsChange }) => {
    
    const sliderRef = useRef<HTMLDivElement>(null);
    const [temperature, setTemperature] = useState(50);
    const isDragging = useRef(false);

    const calculateTemperature = (clientX: number) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const width = rect.width;
        let percentage = (x / width) * 100;
        
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        
        setTemperature(Math.round(percentage));
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
    }, []);

    const handleSave = () => {
        alert("설정이 저장되었습니다!");
    }

    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">AI 비서 설정</h1>
                    <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">AI의 성격과 말투를 취향에 맞게 조절하세요.</p>
                </div>
                <div className="bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood p-8 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">AI 캐릭터 선택</h3>
                        <div className="grid grid-cols-3 gap-4">
                             {([['critic', '냉혹한 비판가'], ['swearer', '험악한 욕쟁이'], ['realist', '현실적 조언가']] as const).map(([persona, name]) => (
                                <button key={persona} onClick={() => onSettingsChange({ ...settings, persona })} className={`p-4 rounded-lg text-center border-4 ${settings.persona === persona ? 'border-accent' : 'border-transparent'}`}>
                                    <span className="text-4xl">{persona === 'critic' ? '🧐' : persona === 'swearer' ? '🤬' : '🤖'}</span>
                                    <p className="font-bold mt-2">{name}</p>
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
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-light text-text-dark px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
                                        {temperature}°C
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-text-light"></div>
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

const CommunityPage: React.FC<{ posts: CommunityPost[] }> = ({ posts }) => {
    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">커뮤니티</h1>
                    <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">자유롭게 목표를 공유하고 서로에게 동기를 부여하세요.</p>
                </div>
                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood p-6">
                            <div className="flex items-start">
                                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full mr-4"/>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">{post.author}</span>
                                            <span className="text-xs text-text-light/70 dark:text-text-dark/70">{post.timestamp}</span>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${post.type === '질문' ? 'bg-blue-500' : post.type === '요청' ? 'bg-green-500' : 'bg-gray-500'}`}>{post.type}</span>
                                    </div>
                                    <h3 className="text-lg font-bold mt-1">{post.title}</h3>
                                    <p className="mt-2 text-sm text-text-light/90 dark:text-text-dark/90">{post.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const [myGoals, setMyGoals] = useState<UserGoal[]>(MY_GOALS);
    const [tasks, setTasks] = useState<Task[]>(TASKS);
    const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
    const [settings, setSettings] = useState<AISettings>(DEFAULT_AI_SETTINGS);
    const [aiMessages, setAiMessages] = useState<AIMessage[]>(AI_MESSAGES);
    const [modalContent, setModalContent] = useState<{ title: string; content: string; persona: AIPersona; goalId: string; } | null>(null);

    const handleAiNudge = (goalId: string) => {
        const { persona, tone } = settings;
        const message = AI_NUDGE_MESSAGES[persona][tone];
        setModalContent({
            title: 'AI의 Nudge',
            content: message,
            persona: persona,
            goalId
        });
    };
    
    const handlePostToWall = () => {
        if (!modalContent) return;
        
        const getMessageType = (persona: AIPersona): 'critic' | 'swearer' => {
            if (persona === 'swearer') return 'swearer';
            return 'critic';
        }

        const newAIMessage: AIMessage = {
            id: `msg-${new Date().getTime()}`,
            type: getMessageType(modalContent.persona),
            title: modalContent.persona === 'swearer' ? '정신 번쩍드는 욕 한사발!' : '따끔한 조언이 도착했어요!',
            content: modalContent.content,
            timestamp: '방금 전',
            goalId: modalContent.goalId,
            rotation: Math.floor(Math.random() * 5) - 2,
        };
        
        setAiMessages(prev => [newAIMessage, ...prev]);
        closeModal();
    };

    const closeModal = () => setModalContent(null);

    return (
        <HashRouter>
            <div className="flex flex-col min-h-screen bg-background-light/90 dark:bg-background-dark/90">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/challenges" element={<ChallengesPage />} />
                    <Route path="/goals" element={<MyGoalsPage myGoals={myGoals} tasks={tasks} />} />
                    <Route path="/goals/:id/tasks" element={<GoalTasksPage myGoals={myGoals} tasks={tasks} onNudge={handleAiNudge}/>} />
                    <Route path="/wall" element={<WallPage messages={aiMessages} />} />
                    <Route path="/goal/:id" element={<GoalDetailPage />} />
                    <Route path="/settings" element={<SettingsPage settings={settings} onSettingsChange={setSettings} />} />
                    <Route path="/community" element={<CommunityPage posts={posts} />} />
                </Routes>
                <AIResponseMessageModal content={modalContent} onClose={closeModal} onPostToWall={handlePostToWall} />
            </div>
        </HashRouter>
    );
};

export default App;