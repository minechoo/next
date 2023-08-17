import React from 'react';
import clsx from 'clsx';
import styles from './Title.module.scss';
import Link from 'next/link';
import { Nanum_Myeongjo } from 'next/font/google';
import { Work_Sans } from 'next/font/google';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum',
	//직접 사용할 변수 등록, 해당 변수명을 활용하면 클래스 등록
});

const work = Work_Sans({
	subsets: ['latin'],
	weight: ['300', '500'],
	preload: true,
	variable: '--font-work',
});

/*
function Title({ children, url, style, className, type }) {
	return (
		<h1
			className={clsx(styles.tit, className, nanum.variable, work.variable, styles[`tit$_{type}`])}
			//url 속성유뮤로 자식에 링크가 있는지 파악
			//만약 자식이 링크가 없으면 상위요소인 h1엘리먼트에는 transition 속성 제거, 자식으로 링크가 없으면 transition 속성 추가
			style={url ? style : { ...style, transitionDuration: '0.5s' }}
			//해당 컴포넌트에 hover이벤트가 발생할때마다 hover, color값을 분기처리
			//style객체가 넘어오지 않을때를 대비해서 옵셔널 체이닝
			onMouseEnter={(e) => (e.target.style.color = style?.hoverColor)}
			onMouseLeave={(e) => (e.target.style.color = style?.color)}
		>
			{url ? (
				//어차피 링크가 있다면 transition이 적용되어야 하므로 해당속성 추가
				<Link href={url} style={{ transitionDuration: '0.5s' }}>
					{children}
				</Link>
			) : (
				{ children }
			)}
		</h1>
	);
}
*/
//React.createElement('elementType:striing', props:object, children:JSX Mode)
function Title({ children, url, style, className, type, tag }) {
	return React.createElement(
		tag, //elementType
		{
			//props
			className: clsx(styles.tit, className, nanum.variable, work.variable, styles[`tit_${type}`]),
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},
		//JSX Node
		url
			? React.createElement(
					Link,
					{
						href: url,
						style: { transitionDuration: '0.5s' },
					},
					children
			  )
			: children
	);
}
export default Title;
