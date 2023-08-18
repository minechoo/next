import Title from '../../atoms/text/Title';
import NavBar from '../../molecules/NavBar/NavBar';
import styles from './Header.module.scss';
import clsx from 'clsx';

function Header() {
	return (
		<header className={clsx(styles.header)}>
			<Title url={'./'} type={'logo'}>
				DEDORDLAB
			</Title>
			<NavBar names={['Find Recipe', 'My Favorait']} gap={20} />
		</header>
	);
}

export default Header;
