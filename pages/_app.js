import '@/styles/globals.scss';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
/*
Atomic Design Pattern : 컴포넌트를 원자처럼 최소단위로 재활용가능하게 처리
단점 : 컴포넌트간에 의존성 생김, 특정 원자단위의 컴포넌트에서 문제가 발생하면 상위컴포넌트까지 다 에러가 발생소지

Atomic(원자)
- 버튼, 메뉴, 제목, 글자, 폼요소, 썸네일

Molecules(분자)
- 검색바 (폼, 버튼), 메뉴(버튼)

Organisms(육기체)
- GNB (메뉴를 그룹화)

Template(탬플릿)
- 유기체들이 모여 있는 기능 덩어리

Pages(페이지)
- 탬플릿을 구성되어 있는 하나에 페이지


-----------------------------------------------
요리명을 검색어로 입력하면 해당요리의 정보와 레시피를 확인하는 웹 서비스

-종아하는 레시피를 저장해서 즐겨찾기(localstorge)

-1. 메인페이지( 특정 카테고리의 요리들을 소개하는 intro) ISR
-2. 레시피 검색페이지(검색창에 검색어로 입력하면 debouncing을 적용해서 레세피목록 결과확인 페이지) CSR
-2-1. 레시피 상세페이지(검색화면에서 목록 클릭시 출력되는 상세페이지, 즐겨찾기 기능 추가) CSR
-3. 즐겨찾기 페이지(즐겨찾기 등록된 목록을 한번에 확인하는 페이지) CSR

페이지별 랜더링 방식
CSR: 빈 HTML을 가져온다음에 동적으로 리액트 럼포넌트가 hydration되면 클라이언트에서 동적으로 데이터 생성해서 랜더링
CSR(react-query): stale,cache타임을 지정해서 stale, cache타임이 소진되기 전까지는 refectching 금지
SSR: 서버쪽에서 데이터를 fetching후 페이지를 미리 만들어서 랜더링(매번 검포넌트 접속할때마다)
SSG: 서버쪽에서 데이터를 fetching후 페이지를 미리 만들어서 랜더링(프로젝트가 빌드될때 한번)
ISR: 서버쪽에서 데이터를 fetching후 페이지를 미리 만들어서 랜더링(일정시간을 직접 설정해서 설정시간마다 다시 데이터 refectching후 빌드)
*/