import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_BLOGS_QUERY_KEY = "blogs";

const getBlogs = async () => {
    const { data } = await api.get(`/blog`);
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
