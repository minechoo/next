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
