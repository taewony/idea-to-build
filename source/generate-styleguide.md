간단한 설계 (요약)

사전 실행:
  - npx create-next-app@latest my-project --typescript --eslint --app
  - cd my-project
  - npm install tailwindcss @tailwindcss/postcss postcss 
  - postcss.config.mjs
  ```
  const config = {
	  plugins: {
		"@tailwindcss/postcss": {},
	  },
	};

  export default config;
```
  
읽기: ./source/tokens.json

중간 생성: {my-project}/app/globals.css — 내용:

	@import "tailwindcss";

	@theme { /* --color-..., --text-... 등 */ } ← Tailwind v4 CSS-first에 의해 자동 사용됨. 
	tailwindcss.com

	:root { /* same variables (for getComputedStyle 디버깅) */ }

	@layer components { /* fallback utility classes like .text-heading */ }

최종 생성: {my-project}/app/style-guide/page.jsx (React) — 생성된 CSS 변수 + Tailwind 클래스를 사용해 토큰을 시각화(디버그 출력 포함).