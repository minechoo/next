import clsx from 'clsx';
import styles from './Title.module.scss';
import Link from 'next/link';

function Title({ children, url, style, className }) {
	return (
		<h1
			className={clsx(styles.tit, className)}
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

export default Title;