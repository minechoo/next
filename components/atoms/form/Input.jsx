import clsx from 'clsx';
import styles from './Input.module.scss';

function Input({ type = 'text', placeholder = 'text', onChange, value, style, className }) {
	return (
		<input
			type={type}
			className={clsx(styles.input)}
			placeholder={placeholder}
			onChange={(e) => onChange(e.target.value)}
			value={value}
			style={style}
		/>
	);
}

export default Input;
