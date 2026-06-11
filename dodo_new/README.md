# DODO 프로젝트

DODO는 일정, 루틴, 메모를 관리하는 플래너 서비스입니다.

## 프로젝트 구조

```
dodo/
├── src/
│   ├── api/              # API 통신 모듈
│   │   ├── axios.ts      # Axios 인스턴스 설정
│   │   ├── homeApi.ts    # 홈 API
│   │   └── memoApi.ts    # 메모 API
│   ├── assets/
│   │   └── images/       # 이미지 리소스
│   ├── components/
│   │   ├── home/         # 홈 화면 컴포넌트
│   │   └── common/       # 공통 컴포넌트
│   ├── hooks/            # 커스텀 훅
│   ├── pages/            # 페이지 컴포넌트
│   ├── styles/           # 전역 스타일
│   └── types/            # TypeScript 타입 정의
│
backend/
└── src/main/java/com/dodo/
    ├── global/           # 전역 설정 (CORS, JPA, 예외처리)
    ├── home/             # 홈 모듈
    ├── memo/             # 메모 모듈
    ├── user/             # 사용자 모듈
    ├── schedule/         # 일정 모듈
    └── routine/          # 루틴 모듈
```

## 기술 스택

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Spring Boot 3.2
- Spring Data JPA
- MySQL
- Lombok

## 실행 방법

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
./gradlew bootRun
```
