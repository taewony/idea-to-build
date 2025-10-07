import FeatureCard from '@/components/FeatureCard';
import Step from '@/components/Step';
import LabCard from '@/components/LabCard';
import LiveDemo from '@/components/LiveDemo';

export default function LandingPage() {
  return (
    <>
      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 md:py-20">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-50">스마트하게 배우는<br/>인공지능 LLM 기초</h2>
          <p className="mt-4 text-slate-400 text-lg">이해하기 쉬운 개념, 단계별 실습, 그리고 로컬 Small‑LM 설치 및 튜NING 가이드까지 —
            처음부터 끝까지 직접 만들어보고 실행해보세요.</p>

          <div className="mt-8 flex gap-4">
            <a href="#labs" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-slate-50 text-slate-900 hover:bg-slate-50/90 h-10 px-6 py-3">Hands‑on Labs</a>
            <a href="#local" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-800 bg-transparent hover:bg-slate-800 h-10 px-6 py-3">Install Small‑LM</a>
          </div>

          <div className="mt-6 text-sm text-slate-500">학습 경로: 기초 개념 → 프롬프트 엔지니어링 → 소형 모델 설치 → 로컬 튜닝</div>
        </div>
        <LiveDemo />
      </section>

      {/* FEATURES */}
      <section id="learn" className="py-16">
        <h3 className="text-3xl font-bold text-center text-slate-50">무엇을 배우나요?</h3>
        <p className="mt-3 text-slate-400 text-center max-w-2xl mx-auto">복잡한 이론 대신, 실제로 손을 움직이며 익히는 방식으로 구성했습니다.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard title="LLM 기초" desc="토큰, 임베딩, 어텐션의 직관적 해설과 시각화 예제" icon="🧠" />
          <FeatureCard title="프롬프트 엔지니어링" desc="프롬프트 설계 원칙과 실습 예제, 실패 케이스 분석" icon="✍️" />
          <FeatureCard title="로컬 Small‑LM" desc="작고 빠른 모델을 설치하고 실험하는 단계별 가이드" icon="💻" />
        </div>
      </section>

      {/* STEPS */}
      <section className="py-16">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h4 className="text-2xl font-bold text-slate-50 text-center">학습 로드맵 — 4단계</h4>
            <ol className="mt-8 space-y-6 max-w-2xl mx-auto">
                <Step num={1} title="개념 익히기" text="토큰화와 임베딩, 어텐션을 손으로 그려보며 이해합니다." />
                <Step num={2} title="프롬프트 실습" text="다양한 목표(요약, 번역, 코딩)에 맞춰 프롬프트를 설계해 봅니다." />
                <Step num={3} title="로컬 Small‑LM 설치" text="Docker/conda 기반으로 작은 모델을 내려받아 로컬에서 실행합니다." />
                <Step num={4} title="튜닝과 배포" text="양자화·미세조정·파이프라인을 통해 성능을 개선하고 배포합니다." />
            </ol>
        </div>
      </section>

      {/* LABS */}
      <section id="labs" className="py-16">
        <h3 className="text-3xl font-bold text-center text-slate-50">Hands‑on Labs</h3>
        <p className="mt-3 text-slate-400 text-center max-w-2xl mx-auto">브라우저 기반 실습 환경에서 즉시 결과를 확인하세요. 코드와 데이터, 커맨드가 제공됩니다.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <LabCard title="Attention Visualizer" subtitle="어텐션 맵을 눈으로 보기" />
          <LabCard title="Prompt Tuner" subtitle="프롬프트 변형으로 성능 변화 측정" />
          <LabCard title="Quantize & Run" subtitle="소형 모델을 양자화해 속도 비교" />
        </div>
      </section>

      {/* LOCAL LM */}
      <section id="local" className="py-16">
         <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h4 className="text-2xl font-bold text-slate-50">로컬 Small‑LM 설치 가이드</h4>
            <p className="mt-2 text-slate-400">Windows / macOS / Linux 지원 — 초보자도 따라할 수 있는 단계별 문서.</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                <h5 className="font-semibold text-slate-300">Quickstart</h5>
                <ol className="mt-3 list-decimal list-inside text-slate-300 space-y-1">
                    <li>환경 준비: Python 3.10+, Conda 권장</li>
                    <li>모델 받기: small‑lm.tar.gz 다운로드</li>
                    <li>실행: python serve.py --model small‑lm</li>
                </ol>
                <div className="mt-6">
                    <a href="#" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-slate-50 text-slate-900 hover:bg-slate-50/90 h-10 px-5 py-2">Full Guide</a>
                </div>
                </div>

                <div>
                <h5 className="font-semibold text-slate-300">튜닝 팁</h5>
                <ul className="mt-3 list-disc list-inside text-slate-300 space-y-1">
                    <li>양자화부터 시작해 메모리 사용량 줄이기</li>
                    <li>LoRA나 PEFT로 빠른 미세조정</li>
                    <li>로컬 데이터로 소량의 에폭만 돌려보기</li>
                </ul>
                </div>
            </div>
         </div>
      </section>

      {/* PRICING / CTA */}
      <section id="pricing" className="py-20 text-center">
        <h4 className="text-3xl font-bold text-slate-50">무료 체험과 교육 패키지</h4>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto">무료 예제와 데모로 시작해, 심화 패키지로 깊게 파고들어보세요.</p>
        <div className="mt-8 flex justify-center gap-4">
          <a className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-slate-50 text-slate-900 hover:bg-slate-50/90 h-11 px-8">Start Free</a>
          <a className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-800 bg-transparent hover:bg-slate-800 h-11 px-8">Contact Sales</a>
        </div>
      </section>
    </>
  );
}