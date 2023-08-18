import Head from 'next/head';
import axios from 'axios';
import Text from '@/components/atoms/text/Text';
import Title from '@/components/atoms/text/Title';
import { Pic } from '@/components/atoms/pic/Pic';
import NavBar from '@/components/molecules/NavBar';
import Header from '@/components/organisms/Header';

export default function Home({ meals, category }) {
	// const newMeals = meals.slice(0, 6);
	// console.log(newMeals);
	console.log(category);
	console.log(meals);
	return (
		<>
			<Head>
				<title>Create Next App</title>
			</Head>
			<h2>Main Page</h2>
		</>
	);
}

export async function getStaticProps() {
	const list = [];
	const { data: obj } = await axios.get('/categories.php');
	const items = obj.categories;
	items.forEach((el) => list.push(el.strCategory));
	const newList = list.filter((el) => el !== 'Goat' && el !== 'Vegan' && el !== 'Starter');

	const randomNum = Math.floor(Math.random() * newList.length);

	const { data } = await axios.get(`/filter.php?c=${newList[randomNum]}`);

	return {
		props: { ...data, category: newList[randomNum] },
		revalidate: 10,
	};
}
