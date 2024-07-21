export const QUERY_KEY = {
  TEST: ["TEST_KEY"],
};

export const QUERY_OPTIONS = {
  TEST: () => ({
    queryKey: QUERY_KEY.TEST,
    queryFn: () => {
      /* fetch 함수 */
    },
  }),
};
