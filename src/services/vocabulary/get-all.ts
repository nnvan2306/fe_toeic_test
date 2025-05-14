import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_CATEGORIES_QUERY_KEY = "categories";

const get = async (categoryId?: number) => {
    const { data } = await api.get(`/vocabulary?categoryId=${categoryId}`);
    return data;
};

export const getOptions = (categoryId?: number) =>
    queryOptions({
        queryKey: [GET_CATEGORIES_QUERY_KEY],
        queryFn: () => get(categoryId),
    });

type UseGetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    categoryId?: number;
};

export const useGetVocabularys = ({ queryConfig, categoryId }: UseGetType) => {
    return useQuery({
        ...getOptions(categoryId),
        ...queryConfig,
    });
};
