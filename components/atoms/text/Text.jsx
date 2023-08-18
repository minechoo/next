import styles from './Text.module.scss';
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Nanum_Myeongjo } from 'next/font/google';
import { Work_Sans } from 'next/font/google';
import { Orbitron } from 'next/font/google';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum',
});

const work = Work_Sans({
	subsets: ['latin'],
	weight: ['300', '500'],
	preload: true,
	variable: '--font-work',
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
});

//React.createElement('elementType:striing', props:object, children:React Mode)
function Text({ children, url, style, className, type, tag = 'p', isOn = false }) {
	return React.createElement(
		tag, //elementType
		{
			//props
			className: clsx(styles.txt, className, nanum.variable, work.variable, styles[`txt_${type}`], isOn && styles.on),
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
