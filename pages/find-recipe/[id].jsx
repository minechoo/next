import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import { BounceLoader } from 'react-spinners';
import { Table } from '@/components/atoms/Table/Table';
import { useState, useEffect } from 'react';

function Detail() {
	const router = useRouter();
	const { id, name, url } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(isSuccess && data);
	const [TableData, setTableData] = useState([]);

	useEffect(() => {
		if (data) {
			const keys = Object.keys(data);
			//레시피 정보 객체에서 strIngredient문자로 시작하는 키값만 배열로 뽑음
			const filterKeys1 = keys.filter((key) => key.startsWith('strIngredient'));
			//위에서 뽑은 키값에서 value값이 빈문자거나 null인 것은 제외
			const filterKeys2 = filterKeys1.filter((key) => data[key] !== '' && data[key] !== null);
			//위에서 뽑은 키값으로 재료순서, 재료명, 재료량을 객체로 변환해서 다시 배열로 반환
			const ingredients = filterKeys2.map((key, idx) => ({
				index: idx + 1,
				ingredient: data[key],
				measuer: data[`strMeasure${idx + 1}`],
			}));
			console.log(ingredients);
			setTableData(ingredients);
		}
	}, [data]);
	return (
		<section className={clsx(styles.detail)}>
			{/* <h1>{name}</h1>
			<p>{url}</p> */}
			<BounceLoader
				loading={!isSuccess}
				cssOverride={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
				size={100}
				color={'orange'}
			/>
			{isSuccess && (
				<>
					<Title type={'slogan'}>{data?.strMeal}</Title>
					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data?.strMealThumb} />
					</div>
				</>
			)}
			<Table data={TableData} title={data?.strMeal} />
		</section>
	);
}

export default Detail;
