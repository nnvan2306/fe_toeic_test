import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const GET_USERS_QUERY_KEY = "history";

const get = async (id: number) => {
    const { data } = await api.get(`/history/${id}`);
    return data;
};

export const getHistoryOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_USERS_QUERY_KEY],
        queryFn: () => get(id),
    });

type UseGetHistoryType = {
    queryConfig?: QueryConfig<typeof getHistoryOptions>;
    id: number;
};

export const useGetHistory = ({ queryConfig, id }: UseGetHistoryType) => {
    return useQuery({
        ...getHistoryOptions(id),
        ...queryConfig,
    });
};
