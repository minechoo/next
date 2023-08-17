import clsx from 'clsx';
import styles from './Visual.module.scss';
import Image from 'next/image';
import Link from 'next/link';

////해당 아톰 컴포넌트가 호출되는 위치에서의 className props를 내부로 전달
export function Visual({ imgSrc, style, imgTxt, children, className, priority = false, url }) {
	return (
		<div className={clsx(styles.pic, className)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
			{imgTxt && (
				<>
					{/* 이미지위에 글자가 출력되야 되므로 dimmed처리할 마스크 */}
					<aside></aside>
					{/* url 값이 전달되면 Link컴포넌트를 연결해서 출력 */}
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
		</div>
	);
}
