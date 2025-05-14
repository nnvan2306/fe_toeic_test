import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_CATEGORIES_QUERY_KEY = "vocabularies";

const get = async (categoryId?: number) => {
    let query = "/vocabulary";
    if (categoryId) {
        query = `/vocabulary?categoryId=${categoryId}`;
    }
    const { data } = await api.get(query);
    return data;
};

export const getOptions = (categoryId?: number) =>
    queryOptions({
        queryKey: [GET_CATEGORIES_QUERY_KEY, categoryId],
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
