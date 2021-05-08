# UOS공지사항의 백엔드 서버

## 주요 기술

- TypeScript, NestJS, PostgesSQL, jest, cheerio

## 개발환경 실행

```
npm i
npm run start:dev
```

## 배포

```
eb deploy
```

## 폴더 구조

```
├── .ebextension           # AWS Elastic Beanstalk의 구성파일
├── config
└── src
   ├── config              # Axios, Graphql, Typeorm의 config
   ├── department          # 부서 관련 모듈, 서비스
   ├── notice              # 공지사항 관련 모듈, 서비스
   ├── notification        # push notification 관련 모듈, 서비스
   ├── scrapper            # 공지사항 스크래핑 관련 모듈, 서비스
   └── user                # 유저 관련 모듈, 서비스
```
