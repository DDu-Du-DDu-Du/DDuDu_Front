const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// TODO requireAuth 파라미터 설정
const fetchApi = (url: string, options: RequestInit = {}, requiredAuth: boolean = false) => {
  if (requiredAuth) {
    // TODO 세션에서 accessToken을 가져와 bearer header에 담아 통신
  }

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
  });
};

export default fetchApi;
