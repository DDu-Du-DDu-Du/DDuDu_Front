import { cache } from "react";

import { getMe, postTest } from "@/app/_services/server";
import { QueryClient } from "@tanstack/react-query";

export const getQueryClient = cache(() => new QueryClient());

export const QUERY_KEY = {
  USER: {
    GET_ME: (id: string) => ["getMe", id],
  },

  TEST: ["test"],
};

export const QUERY_OPTIONS = {
  USER: {
    GET_ME: (id: string) => ({
      queryKey: QUERY_KEY.USER.GET_ME,
      queryFn: () => getMe(id),
    }),
  },

  TEST: () => ({
    queryKey: QUERY_KEY.TEST,
    queryFn: () => postTest(),
  }),
};
