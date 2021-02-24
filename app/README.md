# UOS공지사항의 사용자 어플리케이션

## 주요 기술

- TypeScript, React-Native, Expo, redux, redux-saga

## 실행

```
npm i
npm i -g expo
expo start
```

## 폴더 구조
```
├── .expo-shared           
├── assets
├── src                     
    ├── components              
    │    ├── AllArticles        # 전체 부서 화면 
    │    ├── Article            # 공지사항 게시글 화면
    │    ├── Department         # 부서 즐겨찾기 화면
    │    ├── Home               # 메인화면
    │    ├── More               # 더보기 화면
    │    └── SavedArticles      # 저장된 공지사항
    ├── modules                 
    │    ├── Dialog             # Floating Dialog
    │    ├── Snackbar           # 스낵바
    │    └── HeaderRightButton
    ├── navigator
    │    └── stack              # 각 Tab의 Stack Navigator 
    ├── redux                   # Root redux folder
    ├── repository                   
    └── util                    # 공통으로 사용하는 util function모음                
```
