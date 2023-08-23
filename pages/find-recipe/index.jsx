import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';

export default function Recipe({ categories }) {
	//console.log(categories);
	//useRecipeByCategory (자주활용되는 리액트 기능을 패키징해서 hook형태로 만들어놓은 함수)
	//인수가 전달되면 해당값을 활용해서 react-qeury를 이용하여 비동기서버데이터를 호출하고 해당 결과값을 객체형태로 리턴하는 함수
	//react-query를 굳이 써야되는 이유 : 반환받은 서버 데이터를 캐싱처리해서 동일한 데이터 요청시 다시 refetching하지 않기 위함
	//{data(서버데이터), isSuccess(요청성공시 true반환), isError(요청실패시 true반환), isLoading(요청중일떄 true반환), refetch(강제 refetching함수)}
	//react-query 를 활용하는 쿼리키 인수값을 state에 담음
	const [Selected, setSelected] = useState(categories[0].strCategory);
	//해당 State값이 바뀔때마다 react-query훅이 호출되면서 새로운 데이터 패칭
	//const { data, isSuccess } = useRecipeByCategory(Selected);

	//useDebounce 는 컴포넌트의 재랜더링 자체를 막는것이 아닌
	//특정 state 변경될때마다 실행되는 무거운 함수의 호출 자체를 Debouncing 하기 위함
	const DebouncedSelected = useDebounce(Selected);
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected);
	//console.log(data);
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				{/* 자식 컴포넌트에 이벤트 전달해야때 무조건 이벤트명 props 핸들러함수 전달 : 자식요소에 어떤이벤트에 어떤 핸들러가 보내지는 파악하기 위함 */}
				{/* State변경하는 이벤트 핸들러함수를 onClick props에 담아서 전달 */}
				<Category items={categories} onClick={setSelected} />
				{isCategory && dataByCategory.map((el) => <Card key={el.idMeal} imgSrc={el.strMealThumb} />)}
			</section>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/categories.php');

	return {
		props: { categories: data.categories },
	};
}
