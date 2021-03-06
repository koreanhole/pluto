# pluto

UOS공지사항

- iOS: https://apps.apple.com/us/app/id1529569963
- Android: https://play.google.com/store/apps/details?id=com.koreanhole.app.pluto
- Web(개발중): https://uosnotify.netlify.app/

## Intro

- 서울시립대학교의 공지사항들을 웹/앱에서 쉽고 빠르게 볼 수 있게 하는 프로젝트.
- 개발기간: 2020.07 ~ 현재
- app, web, server의 monolithic repository.

![screenshot](./assets/images/pluto.png)

## app

- 사용자 어플리케이션

### 주요내용

- 원하는 부서의 공지사항만 모아서 볼 수 있다.
- 원하는 부서에 새로운 공지사항이 올라왔을때 푸시 알림을 받을 수 있다.
- 모든 부서의 공지사항을 볼 수 있다.
- 중요한 공지사항의 경우 저장 가능
- 공지사항의 첨부파일 다운로드 가능

### 주요 기술

- TypeScript, React-Native, Expo, redux, redux-saga

## server

- 백엔드 서버

### 주요내용

- 30분마다 CRON job으로 공지사항 스크래핑 작업 수행
- deploy to AWS elastic beanstalk

### 주요 기술

- TypeScript, NestJS, PostgesSQL, jest, cheerio
