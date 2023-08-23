import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	//해당 커스텀훅으로 호출되는 fetching함수가 만약 컴포넌트 마운트되자마자 호출된다면
	//data값 자체가 없기 때문에 meals에서 undefined오류 발생을 피하기 위함
	return data?.meals || [];
};

export const useRecipeByCategory = (SelectedCategory) => {
	return useQuery(['RecipeByCategory', SelectedCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60,
		staleTime: 1000 * 60,
		retry: 3, //데이터 요청 시도 횟수(디폴트3, 네트워크상황이 안 좋을때 재시도횟수 늘림)
		//enabled값에는 truty falsy값이 적용이 안됨(직접  boolean 값을 생성해서 저장)
		//지금 상황에서는 SSG방식으로 초기데이터를 호출하고 있기 때문에 아래구문을 지정안해도 잘 동작됨
		//CSR방식으로 호출할떄에는 초기값이 undefined이기 때문에 발생하는 에러를 미리 방지
		enabled: SelectedCategory !== undefined, //useQuery 호출유무 true(실행, 디폴트) false(실행안함)
	});
};
