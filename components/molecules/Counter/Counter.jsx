import { Text } from '@/components/atoms/text/Text';
import styles from './Counter.module.scss';
import clsx from 'clsx';

function Counter({ index, len }) {
	return (
		<div className={clsx(styles.counter)}>
			<Text tag={'strong'}>{index < 10 ? '0' + (index + 1) : index}</Text>
			<Text tag={'span'}>/{len < 10 ? '0' + (len + 1) : len}</Text>
		</div>
	);
}

export default Counter;
