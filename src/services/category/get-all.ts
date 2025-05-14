import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_CATEGORIES_QUERY_KEY = "categories";

const getBlogs = async () => {
    const { data } = await api.get(`/category`);
    return data;
};

export const getCategoriesOptions = () =>
    queryOptions({
        queryKey: [GET_CATEGORIES_QUERY_KEY],
        queryFn: () => getBlogs(),
    });

type UseGetCategorisType = {
    queryConfig?: QueryConfig<typeof getCategoriesOptions>;
};

export const useGetCategoris = ({ queryConfig }: UseGetCategorisType) => {
    return useQuery({
        ...getCategoriesOptions(),
        ...queryConfig,
    });
};
