export const MUTATION_KEY = {
  TEST: ["TEST_KEY"],
};

export const MUTATION_OPTIONS = {
  TEST: () => ({
    mutationKey: MUTATION_KEY.TEST,
    mutationFn: () => {
      /* fetch 함수 */
    },
  }),
};
