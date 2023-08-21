import styles from './Text.module.scss';
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Nanum_Myeongjo } from 'next/font/google';
import { Work_Sans } from 'next/font/google';
import { Orbitron } from 'next/font/google';
import { useRouter } from 'next/router';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum',
	display: 'swap', //block(default): 외부폰트가 준비안되었을때 해당 텍스트 숨김처리, swap: 외부폰트 준비가 안되었을때 일단은 기본 system 폰트를 fallback처리해서 보임처리
	adjustFontFallback: false, //레이아웃 최적화를 위해서 자동으로 fallback(대체폰트출력)
});

const work = Work_Sans({
	subsets: ['latin'],
	weight: ['300', '500'],
	preload: true,
	variable: '--font-work',
	display: 'swap',
	adjustFontFallback: false,
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
	display: 'swap',
	adjustFontFallback: false,
});

//React.createElement('elementType:striing', props:object, children:React Mode)
function Text({ children, url, style, className, type, tag = 'p', isOn = false }) {
	const router = useRouter();
	const currentPath = router.pathname;
	return React.createElement(
		tag, //elementType
		{
			//props
			className: clsx(
				currentPath === url ? styles.on : '',
				styles.txt,
				className,
				nanum.variable,
				work.variable,
				styles[`txt_${type}`],
				isOn && styles.on
			),
			//전달되는 boolean값에 따라 고유클래스 on추가, module.sass가 자체적으로 고유클래스명으로 변환하기 때문에 부모의 클래스명을 내부 전용 css에 연결하는게 불가
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},
		//React Node
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
export default Text;
