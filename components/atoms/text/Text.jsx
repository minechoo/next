import styles from './Text.module.scss';

function Text({ imgTxt }) {
	return (
		<div>
			<p className={styles.txt}>{imgTxt}</p>
		</div>
	);
}

export default Text;
