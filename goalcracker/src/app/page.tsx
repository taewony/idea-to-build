import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-grow">
      <div className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/home/1920/1080')` }}></div>
        <div className="absolute inset-0 bg-primary/50"></div>
        <div className="relative z-10 p-8">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-lg">목표를 깨부수는 즐거움</h1>
          <p className="mt-4 text-xl md:text-2xl font-medium max-w-2xl mx-auto drop-shadow-md">GoalCracker와 함께라면, 어떤 목표든 달성할 수 있습니다. AI의 도움으로 당신의 잠재력을 폭발시키세요.</p>
          <Link href="/challenges" className="mt-8 inline-block bg-accent text-white text-lg font-bold py-3 px-8 rounded-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-110 shadow-xl">
            도전 시작하기
          </Link>
        </div>
      </div>
    </main>
  );
}