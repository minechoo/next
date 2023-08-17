import clsx from 'clsx';
import React from 'react';
import styles from './Visual.module.scss';
import Image from 'next/image';

////해당 아톰 컴포넌트가 호출되는 위치에서의 className props를 내부로 전달
export function Visual({ imgSrc, style, imgTxt, children, className, priority = false }) {
	return (
		<div className={clsx(styles.pic, className)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
			{imgTxt && <h2>{imgTxt}</h2>}
			{children && children}
		</div>
	);
}
