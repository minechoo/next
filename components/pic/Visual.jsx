import clsx from 'clsx';
import React from 'react';
import styles from './Visual.module.scss';
import Image from 'next/image';

export function Visual({ imgSrc, style, imgTxt, children }) {
	return (
		<div className={clsx(styles.pic)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
			{imgTxt && <h2>{imgTxt}</h2>}
			{children && children}
		</div>
	);
}
