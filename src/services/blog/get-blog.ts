import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_BLOG_QUERY_KEY = "blog_GET";

const getBlogs = async (id: number) => {
    const { data } = await api.get(`/blog/${id}`);
    return data;
};

export const getBlogOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_BLOG_QUERY_KEY],
        queryFn: () => getBlogs(id),
    });

type UseGetBlogsType = {
    queryConfig?: QueryConfig<typeof getBlogOptions>;
    id: number;
};

export const useGetBlog = ({ queryConfig, id }: UseGetBlogsType) => {
    return useQuery({
        ...getBlogOptions(id),
        ...queryConfig,
    });
};
