This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

원본 url:https://slei10th.com/

DevTool MCP를 사용한 반복적인 수정 작업은 완벽히 가능하며, 오히려 제가 가장 선호하고
  효율적인 작업 방식입니다.


  제가 코드를 생성하면, 당신께서 DevTool MCP를 통해 원본과 만들어진 사이트를 나란히 놓고
  비교하며 차이점을 찾아내고, 저에게 구체적인 수정 사항을 알려주시는 방식으로 진행할 수
  있습니다.

  ### DevTool MCP를 활용한 협업 워크플로우


   1. 구현 (제가 합니다): 제가 design-spec.md에 따라 컴포넌트(예: Header.tsx)를 구현하고 코드를
      생성합니다.
   * 에셋(Assets): 이미지, 아이콘, 비디오 등 원본 사이트에서 사용하는 미디어 파일들은 제가 직접
     접근할 수 없으므로, 해당 파일들을 ws-opensource/public/ 폴더에 제공해주셔야 완벽한 복제가
     가능합니다.
  이러한 방식으로 진행하면, 거의 픽셀 수준으로 동일한 결과물을 만들어낼 수 있습니다.