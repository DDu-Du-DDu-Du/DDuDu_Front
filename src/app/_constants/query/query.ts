// import { cache } from "react";
import { getMe, postTest } from "@/app/_services/server";

// import { QueryClient } from "@tanstack/react-query";

// export const getQueryClient = cache(() => new QueryClient());

export const QUERY_KEY = {
  USER: {
    GET_ME: (accessToken: string) => ["getMe", accessToken],
  },

  TEST: ["test"],
};

export const QUERY_OPTIONS = {
  USER: {
    GET_ME: () => ({
      queryKey: QUERY_KEY.USER.GET_ME,
      queryFn: () => getMe("testAccessToken"),
    }),
  },

  TEST: () => ({
    queryKey: QUERY_KEY.TEST,
    queryFn: () => postTest(),
  }),
};
