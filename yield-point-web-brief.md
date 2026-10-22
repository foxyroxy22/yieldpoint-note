# Yield Point — 3D Zine Website Brief

Claude Code 작업용 기획서. 이 파일을 프로젝트 루트에 두고 작업 시작 시 읽게 할 것.

## 1. 목표

인쇄용으로 기획한 A6 8페이지 zine "Yield Point"를 원페이지 웹사이트로 옮긴다. 화면 중앙에 3D로 렌더한 zine 실물이 있고, 사용자가 종이를 넘기듯 페이지를 넘기며 읽는다. 포트폴리오 및 온라인 인터뷰(화면 공유)에서 보여주는 용도.

핵심 경험: 실물 종이 zine을 손으로 넘기는 느낌. 무광 코팅지(스노우지)의 질감, 종이가 휘며 넘어가는 움직임, 앞뒤를 감싼 반투명 트레싱지 재킷.

## 2. 컨셉 요약

- 제목: Yield Point
- 한 줄 컨셉: 한 사람이 공학(고분자공학)에서 디자인으로 영구 변형된 과정을 인장 시험 보고서 형식으로 기록한 zine
- 은유 흐름: 탄성(3p) → 항복점(4–5p) → 변형 경화(6p) → 시험 진행 중(7p)
- 톤: 정돈된 실험 노트. 모눈 그리드, 데이터 표, 응력-변형 곡선, Fig. 번호 붙은 그래픽
- 두 목소리: 관찰 기록·데이터는 모노스페이스 / 여백 메모(개인적인 문장)는 세리프
- 색: 검정 + 포인트 한 색 (미정, 파랑 우선 검토)

## 3. 실물 사양 (3D 모델 기준)

- 페이지 크기: A6, 105 × 148 mm (비율 1 : 1.414)
- 총 8페이지: 표지(1) / 2–3 펼침 / 4–5 중앙 펼침 / 6–7 펼침 / 뒤표지(8)
- 인쇄본은 한 장 접기 후 뒷면끼리 붙여 두 겹. 웹에서는 일반 책처럼 4장(leaf)이 넘어가는 구조로 단순화해도 됨
- 종이: 스노우지 100g, 무광. 두 겹이라 살짝 도톰한 두께감
- 재킷: 트레싱지(반투명), 앞뒤 표지를 감쌈. 시편 라벨 인쇄

## 4. 기술 방향

권장 스택
- React + Vite
- React Three Fiber + @react-three/drei
- 페이지: 세로 분할된 PlaneGeometry + SkinnedMesh(본)로 휘어지며 넘어가는 페이지 구현
- 페이지 그래픽은 Figma에서 내보낸 이미지를 텍스처로 사용 (인쇄본과 동일한 디자인 소스)
- 배포: Vercel

대안 (3D 구현이 막히거나 시간이 부족할 때)
- CSS 3D transform 기반 페이지 넘김, 또는 page-flip 계열 라이브러리
- 이 경우에도 텍스처 이미지와 인터랙션 규칙은 동일하게 유지

머티리얼
- 페이지: 무광 종이 (roughness 높게, metalness 0), 은은한 종이 결 노멀맵 선택
- 재킷: 반투명 (opacity 또는 transmission), 아래 표지가 비쳐 보여야 함. 첫 클릭에 재킷이 열리거나 벗겨지는 동작

## 5. 인터랙션

- 넘기기: 페이지 클릭 또는 드래그, 키보드 좌우 화살표, 모바일 스와이프
- 시작 상태: 재킷 씌운 표지가 살짝 기울어진 채 놓여 있음
- 진행 표시: 화면 구석에 작은 응력-변형 곡선 아이콘, 현재 페이지 구간만 포인트 색 (zine 안의 장치와 동일)
- 카메라: 기본 고정, 드래그로 약간만 회전 허용 (과한 오빗 금지)
- 그림자: 바닥에 부드러운 그림자로 실물감
- 접근성: prefers-reduced-motion이면 넘김 애니메이션을 짧은 페이드로 대체. 키보드 포커스 표시. 각 페이지 카피를 화면 밖 HTML 텍스트로도 제공(스크린리더, 검색)
- 선택 아이디어: 마지막 페이지 이후 "Unfold" 동작으로 zine이 펼쳐지며 전체 응력-변형 곡선 포스터가 나타남 (인쇄본에서는 풀로 붙여 포기한 요소를 웹에서 살림)

## 6. 원페이지 구성

1. 3D zine (화면 대부분 차지, 첫 화면)
2. 짧은 소개: 왜 실험 보고서 형식인가 (2–3문장)
3. 콜로폰: 서체, 용지, 제작 정보, 연락처 (Behance / Instagram)

장식 요소는 최소화. zine이 주인공.

## 7. 페이지별 카피 (확정 초안)

**재킷** SPECIMEN No. 01 / Material: Ajin Kim / Test: Tensile / Status: In progress

**1p 표지** YIELD POINT / A tensile test report on one career / 덤벨 시편 라인 드로잉

**2p MATERIALS**
Specimen No. 01
Origin: B.Eng. Polymer Engineering, 2020–2026
Initial purpose: cosmetic research (color, mixing)
Processing: UI/UX bootcamp, 2025.02
Current application: designer, since 2025.11
Test method: ASTM D638
(여백 메모) I came for the colors. I didn't know chemistry came first.

**3p LOG 01 · 2020.02–2022.12 · Elastic region**
Observation: Load increased. Specimen stretched, but held its original form.
(여백 메모) The only part I loved was watching the color change at the endpoint, and writing down the time.

**4–5p LOG 02 · 2022.12 · Yield point**
곡선 주석: 2022.12 Coding, 3 months / CSS / Decision: web designer / 2023.02–2024.02 Test paused: working holiday
Observation: Specimen did not return to its original form.
(여백 메모) Code needed design. And I had always loved making slides and decorating diaries.

**6p DISCUSSION · 2025.02– · Strain hardening**
2025.02 UI/UX bootcamp / 2025.11 Hired as a designer / 2026.02 Graduated, Polymer Engineering
Observation: Under new loads, the specimen grew stronger.
Loads tested: packaging / web / exhibition space / content marketing
Result: no loss of interest observed
(여백 메모, 택1) None of it felt like work. Not even at work. / I finished engineering as a designer.

**7p FUTURE WORK**
Observation: Missing fundamentals: typography, art history, vocabulary, sketching.
Hypothesis: A second process, from the beginning, will make the material stronger.
Note: The first test did not fail. It measured what I am made of.
(여백 메모) The first time, I didn't know what I liked. This time, I do.
Test in progress. Fracture not observed.

**8p COLOPHON** 서체, Snow 100g, A6, 디지털 인쇄, 날짜, Busan, Behance / Instagram
(한 줄) Recorded the way I liked best: watching a change, and noting the time.

## 8. 필요한 에셋 (준비 담당: Roxie)

| 에셋 | 형식 | 비고 |
|---|---|---|
| 페이지 1–8 디자인 | PNG 또는 WebP, 페이지당 1개 | Figma A6 프레임에서 3x 이상 내보내기 (약 1240 × 1748px 이상) |
| 재킷 앞/뒤 | 투명 배경 PNG | 라벨·그리드만, 나머지는 투명 |
| 서체 | 웹 라이선스 확인된 파일 또는 Google Fonts | 모노스페이스 1, 세리프 1 |
| 포인트 색 | HEX | 미정 |
| 연락처 링크 | URL | Behance, Instagram |
| Fig. 이미지 (선택) | JPG/PNG | 실험 노트, 다이어리, 첫 웹사이트 등. 없으면 그래픽으로 대체 |

에셋이 준비되기 전에는 단색 플레이스홀더 텍스처(페이지 번호만 표시)로 3D 넘김부터 먼저 구현한다.

## 9. 작업 순서

1. 플레이스홀더 텍스처로 3D 책 넘김 프로토타입 (모바일 포함 동작 확인)
2. 재킷 반투명 레이어와 여는 동작
3. 진행 표시 곡선 아이콘, 키보드·스와이프, reduced motion 대응
4. Figma 디자인 텍스처로 교체
5. 소개·콜로폰 섹션, 화면 밖 HTML 텍스트
6. 성능 정리 (텍스처 압축, 지연 로딩), Vercel 배포

## 10. 미정 사항

- 포인트 색 (파랑 / 주황빨강)
- 모노스페이스, 세리프 서체
- 6p 여백 메모 택1
- Unfold 포스터 포함 여부
