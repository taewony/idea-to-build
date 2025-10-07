## LLM을 처음부터 만들어보는 여정에 오신 것을 환영합니다

API를 호출하는 것을 넘어, 대규모 언어 모델(LLM)의 심장부로 뛰어들어 그 작동 원리를 직접 파헤쳐보는 학습 여정을 시작합니다. 이 과정은 단순히 코드를 따라 치는 것을 넘어, 토큰화부터 트랜스포머 아키텍처, 그리고 학습 루프에 이르기까지 LLM을 구성하는 핵심 요소들을 PyTorch를 사용해 한 단계씩 직접 구현해보는 데 목적이 있습니다.

### 왜 처음부터 만들어야 할까요?

추상화된 라이브러리 뒤에 숨겨진 원리를 이해하는 것은 AI 모델을 깊이 있게 다루고, 문제를 해결하며, 자신만의 아이디어를 구현하는 데 필수적입니다. 우리는 두 가지 핵심적인 접근 방식을 병행하며 학습할 것입니다:

1.  **PyTorch 기반 구현 (`LLMs-from-scratch`):** 현대적인 딥러닝 프레임워크를 사용해 LLM의 각 구성 요소를 직관적으로 설계하고 실험합니다. 빠른 프로토타이핑과 디버깅에 유리합니다.
2.  **저수준 C/CUDA 구현 (`llm.c`):** Andrej Karpathy의 `llm.c` 프로젝트를 통해, 실제 하드웨어에서 모델이 어떻게 메모리를 사용하고 연산을 수행하는지 깊이 있게 이해합니다. "PyTorch가 내부에서 어떻게 동작하는가"에 대한 답을 얻을 수 있습니다.

이 두 가지 관점을 함께 학습함으로써, 우리는 이론과 실제 구현, 그리고 최적화까지 아우르는 통합적인 시야를 갖게 될 것입니다.

### 학습 로드맵

우리는 다음과 같은 단계를 거쳐 점진적으로 모델을 완성해 나갈 것입니다.

1.  **환경 설정:** WSL2, NVIDIA 드라이버, CUDA, PyTorch를 설치하여 로컬 GPU 개발 환경을 구축합니다.
2.  **토크나이저와 데이터 파이프라인:** 텍스트를 모델이 이해할 수 있는 숫자로 변환하는 토크나이저를 구현합니다.
3.  **트랜스포머 블록:** LLM의 핵심인 어텐션 메커니즘과 트랜스포머의 기본 빌딩 블록을 만듭니다.
4.  **학습 루프 완성:** 모델이 데이터를 통해 학습할 수 있도록 전체 학습 파이프라인과 옵티마이저를 구현합니다.
5.  **PyTorch와 llm.c 비교:** 두 구현 방식을 비교하며 저수준 최적화의 원리를 탐구합니다.
6.  **실험 및 회고:** 직접 만든 모델로 다양한 실험을 진행하고, 그 과정을 기록하여 우리만의 플레이북을 만듭니다.

이 여정의 끝에서 당신은 자신만의 작은 언어 모델을 갖게 될 뿐만 아니라, LLM 기술의 근본 원리에 대한 깊은 통찰을 얻게 될 것입니다.

---

### 주요 참고 자료 (References)

*   **Andrej Karpathy - llm.c:** LLM 구현을 C/CUDA로 단순 명료하게 보여주는 프로젝트.
    *   [GitHub Repository](https://github.com/karpathy/llm.c)
*   **The Little Book of llm.c:** `llm.c`의 각 구성요소를 친절하게 해설한 가이드.
    *   [Online Book](https://little-book-of.github.io/llm.c)
*   **Sebastian Raschka - LLMs-from-scratch:** PyTorch 기반으로 LLM을 기초부터 구현하는 실습형 튜토리얼.
    *   [GitHub Repository](https://github.com/rasbt/LLMs-from-scratch)
*   **PyTorch 공식 설치 가이드:** 로컬 환경에 맞는 PyTorch 버전을 설치하는 방법을 안내합니다.
    *   [PyTorch Website](https://pytorch.org/get-started/locally/)
*   **NVIDIA CUDA on WSL 가이드:** WSL 환경에서 GPU를 사용하기 위한 CUDA 설치 방법을 안내합니다.
    *   [NVIDIA Docs](https://docs.nvidia.com/cuda/wsl-user-guide/index.html)
