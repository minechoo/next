import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';
import { Title } from '@/components/atoms/text/Title';
import clsx from 'clsx';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import { Text } from '@/components/atoms/text/Text';

export default function Recipe({ categories }) {
	//console.log(categories);
	//useRecipeByCategory (자주활용되는 리액트 기능을 패키징해서 hook형태로 만들어놓은 함수)
	//인수가 전달되면 해당값을 활용해서 react-qeury를 이용하여 비동기서버데이터를 호출하고 해당 결과값을 객체형태로 리턴하는 함수
	//react-query를 굳이 써야되는 이유 : 반환받은 서버 데이터를 캐싱처리해서 동일한 데이터 요청시 다시 refetching하지 않기 위함
	//{data(서버데이터), isSuccess(요청성공시 true반환), isError(요청실패시 true반환), isLoading(요청중일떄 true반환), refetch(강제 refetching함수)}
	//react-query 를 활용하는 쿼리키 인수값을 state에 담음

	//Selected, Search 값이 변경되면 컴포넌트 재호출되며
	//컴포넌트 재호출되면 자동으로 react-query훅이 해당 state값을 인수로 전달해서 자동데이터 fetching처리
	//미리 지정한 stale, cache가 남아있으면 데이터를 refetching하지 않음
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');
	//해당 State값이 바뀔때마다 react-query훅이 호출되면서 새로운 데이터 패칭
	//const { data, isSuccess } = useRecipeByCategory(Selected);

	//useDebounce 는 컴포넌트의 재랜더링 자체를 막는것이 아닌
	//특정 state 변경될때마다 실행되는 무거운 함수의 호출 자체를 Debouncing 하기 위함

	//이벤트가 단기간에 너무 많은 요청이 들어가는 것을 방지하기 위해서 위 2개 state값을 debounce처리해서 핸들러 호출횟수를 줄임
	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected, DebouncedSearch);
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);
	//console.log(data);

	//카테고리 버튼을 클릭할때 실행되는 함수
	//Selected값이 변경되고 새롭게 쿼리 요청을 보내는 조건이 Search값이 비어있어야 가능하므로
	//일단 Search값을 비워놓고 State변경요청 보내는 함수
	const handleClickCategory = (state) => {
		setSearch('');
		setSelected(state);
	};

	useEffect(() => {
		//디바운싱되는 search, selected 값이 변경될때마다 실행되는 useEffect
		//Search값이 있다면 기존의 카테고리 값을 비워야되므로 setSelected빈문자값을 쿼리보내서 빈배열을 다시 반환, 결과적으로 해당데이터는 화면에서 사라짐
		console.log(DebouncedSearch);

		if (DebouncedSearch) {
			//search값이 없으면 다시 Search를 초기화시킨다음에
			//Selected값을 변경해서 새로 쿼리요청을 보냄
			setSelected('');
		} else {
			//처음 마운트가 되어서 검색어가 없거나 사용자가 일부러 검색어를 비운 경우
			setSearch('');
			!DebouncedSelected && setSelected(categories[0].strCategory);
		}
	}, [DebouncedSearch, DebouncedSelected, categories]);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				{/* 자식 컴포넌트에 이벤트 전달해야때 무조건 이벤트명 props 핸들러함수 전달 : 자식요소에 어떤이벤트에 어떤 핸들러가 보내지는 파악하기 위함 */}
				{/* State변경하는 이벤트 핸들러함수를 onClick props에 담아서 전달 */}
				{/* 버튼활성화 순서1- category로 활성화여부를 구분할수 있는 정보값을 active라는 props로 전달 */}
				{/* 카테고리 버튼 클릭할때마다 실행할 핸들러 함수를 onClick props으로 전달 */}
				<Category items={categories} onClick={handleClickCategory} active={DebouncedSelected} />

				<Title type={'slogan'} className={clsx(styles.titCategory)}>
					{DebouncedSelected ? DebouncedSelected : `result: ${DebouncedSearch}`}
				</Title>

				{/* 검색창에 onChange가 발생할때마다 실행할 함수를 onChange props로 전달 */}
				<SearchBar inputType={'text'} isBtn={false} placeholder={'search'} value={Search} onChange={setSearch} />

				<div className={clsx(styles.listFrame)}>
					{/* 카테고리가 데이터가 있을때  */}
					{isCategory &&
						dataByCategory.map((el) => (
							<Card
								key={el.idMeal}
								imgSrc={el.strMealThumb}
								url={`/find-recipe/${el.idMeal}`}
								txt={`category: ${el.strMeal}`}
								className={clsx(styles.card)}
							/>
						))}
					{/* search 데이터 있을때 */}
					{isSearch &&
						dataBySearch.map((el) => (
							<Card
								key={el.idMeal}
								imgSrc={el.strMealThumb}
								url={`/find-recipe/${el.idMeal}`}
								txt={`search: ${el.strMeal}`}
								className={clsx(styles.card)}
							/>
						))}
					{/* category가 없고 search 있고 Search 값이 0일때 */}
					{isSearch && dataBySearch.length === 0 && (
						<Text style={{ fontSize: 22, marginTop: 80, color: 'orange' }}>
							No result || <br /> Try another Recipe Name
						</Text>
					)}
				</div>
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
