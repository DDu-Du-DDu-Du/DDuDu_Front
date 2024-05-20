import { cache } from "react";

import { getMe } from "@/app/_services/server";
import { QueryClient } from "@tanstack/react-query";

export const getQueryClient = cache(() => new QueryClient());

export const QUERY_KEY = {
  USER: {
    GET_ME: (id: string) => ["getMe", id],
  },
};

export const QUERY_OPTIONS = {
  USER: {
    GET_ME: (id: string) => ({
      queryKey: QUERY_KEY.USER.GET_ME,
      queryFn: () => getMe(id),
    }),
  },
};
