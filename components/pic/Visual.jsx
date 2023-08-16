import clsx from 'clsx';
import React from 'react';
import styles from './Visual.module.scss';
import Image from 'next/image';

function Visual({ imgSrc, style }) {
	return (
		<div className={clsx(styles.pic)} style={{ position: 'relative', width: 400, height: 300 }}>
			<Image
				src={imgSrc}
				alt={imgSrc}
				priority
				fill
				quality={50}
				style={{ objectFit: 'cover' }}
				//이미지 속성이 fill로 지정되어 있을경우 frame크기에 상관없이 초기 로딩시 전체 브라우저 크기의 100vw크기의 용량으로 가져오기 때문에 브라우저 폭에 출력될 크기를 지정해서 이미지 성능 향상
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			/>
		</div>
	);
}

export default Visual;
