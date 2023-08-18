import clsx from 'clsx';
import styles from './Pic.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { DotLoader } from 'react-spinners';

export function Pic({ imgSrc, style, imgTxt, children, className, priority = false, url }) {
	const [IsLoaded, setIsLoaded] = useState(false);

	return (
		<div className={clsx(styles.pic, className)} style={style}>
			<Image
				src={imgSrc}
				alt={imgSrc}
				priority
				fill
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				onLoadingComplete={() => setIsLoaded(true)}
			/>
			{imgTxt && (
				<>
					<aside></aside>
					{url ? (
						<h2>
							<Link href={url}>{imgTxt}</Link>
						</h2>
					) : (
						<h2>{imgTxt}</h2>
					)}
				</>
			)}
			{children && (
				<>
					<aside></aside>
					{url ? <Link href={url}>children</Link> : children}
				</>
			)}
			{/* 로딩 */}
			<DotLoader
				cssOverride={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
				size={100}
				color={'aqua'}
				loading={!IsLoaded}
			/>
		</div>
	);
}
