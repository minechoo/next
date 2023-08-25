import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import { BounceLoader } from 'react-spinners';

function Detail() {
	const router = useRouter();
	const { id, name, url } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(isSuccess && data);

	if (isSuccess) {
		const keys = Object.keys(data);
		console.log(keys);
		const filterkey1 = keys.filter((key) => key.startsWith('strIngredient'));
		console.log(filterkey1);
		const filterKey2 = filterkey1.filter((key) => data[key] !== '' && data[key] !== null);
		console.log(filterKey2);
		const ingredients = filterKey2.map((key, idx) => ({
			index: idx + 1,
			ingredients: data[key],
			measure: data[`strMeasure${idx + 1}`],
		}));
		console.log(ingredients);
	}
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
		</section>
	);
}

export default Detail;
