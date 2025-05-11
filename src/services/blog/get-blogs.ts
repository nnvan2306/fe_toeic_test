import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const GET_BLOGS_QUERY_KEY = "blogs";

const getBlogs = async () => {
    const { data } = await api.get(`/`);
    return data;
};

export const getBlogsOptions = () =>
    queryOptions({
        queryKey: [GET_BLOGS_QUERY_KEY],
        queryFn: () => getBlogs(),
    });

type UseGetBlogsType = {
    queryConfig?: QueryConfig<typeof getBlogsOptions>;
};

export const useGetBlogs = ({ queryConfig }: UseGetBlogsType) => {
    return useQuery({
        ...getBlogsOptions(),
        ...queryConfig,
    });
};
