import styles from './Swiper.module.scss';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import { Title } from '@/components/atoms/text/Title';
import { useState } from 'react';
import Slider from '@/components/molecules/Slider/Slider';
import Counter from '@/components/molecules/Counter/Counter';

SwiperCore.use([Autoplay]);
//npm i swiper@9
function SwiperWrap({ recipe, category }) {
	const [Index, setIndex] = useState(0);
	return (
		<figure className={clsx(styles.visual)}>
			<Title style={{ position: 'absolute', top: '20vh', left: '10vw', fontSize: 50, color: 'orange' }}>
				{category}
			</Title>

			<Slider data={recipe} index={Index} />
			<Counter index={Index} len={recipe.length} />

			<Swiper
				className={clsx(styles.swiper)}
				modules={[Autoplay]}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				loop={true}
				grabCursor={true}
				slidesPerView={3}
				spaceBetween={100}
				centeredSlides={true}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
				//loop 기능 적용하면 슬라이드가 동적으로 추가되기때문에 순번이 어그러짐
				//아래와 같이 onSlideChange 이벤트 발생시 자동으로 전달되는 파라미터 객체의 realIndex 프러퍼티 활용
				onSlideChange={(el) => setIndex(el.realIndex)}
			>
				{recipe.map((item) => (
					//SwiperSlide 컴포넌트 안쪽에서 자동으로 JSX리턴하는 함수 호출가능
					//해당함수에는 파라미터로 현재 컴포넌트 요소가 활성화되어있는 구분할 수 있는 객체가 전달
					<SwiperSlide key={item.idMeal} className={clsx(styles.swiperSlide)}>
						{({ isActive }) => {
							console.log(isActive);
							return (
								<div className={clsx(isActive ? styles.on : '')}>
									<Title tag={'h3'} url={'/'} type={'slogan'}>
										{item.strMeal.length > 25 ? item.strMeal.substr(0, 25) : item.strMeal}
									</Title>
								</div>
							);
						}}
					</SwiperSlide>
				))}
			</Swiper>
		</figure>
	);
}

export default SwiperWrap;
