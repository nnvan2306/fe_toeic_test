import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const GET_USERS_QUERY_KEY = "history";

const get = async () => {
    const { data } = await api.get(`/history`);
    return data;
};

export const getHistoryOptions = () =>
    queryOptions({
        queryKey: [GET_USERS_QUERY_KEY],
        queryFn: () => get(),
    });

type UseGetHistoryType = {
    queryConfig?: QueryConfig<typeof getHistoryOptions>;
};

export const useGetAllHistory = ({ queryConfig }: UseGetHistoryType) => {
    return useQuery({
        ...getHistoryOptions(),
        ...queryConfig,
    });
};
