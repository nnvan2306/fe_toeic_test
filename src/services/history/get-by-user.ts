import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const GET_HISTORIES_QUERY_KEY = "histories";

const get = async (id: number) => {
    const { data } = await api.get(`/history/user/${id}`);
    return data;
};

export const getHistoriesOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_HISTORIES_QUERY_KEY],
        queryFn: () => get(id),
    });

type UseGetHistoryType = {
    queryConfig?: QueryConfig<typeof getHistoriesOptions>;
    id: number;
};

export const useGetHistories = ({ queryConfig, id }: UseGetHistoryType) => {
    return useQuery({
        ...getHistoriesOptions(id),
        ...queryConfig,
    });
};
