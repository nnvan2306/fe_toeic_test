import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const GET_USERS_QUERY_KEY = "users";

const getUsers = async () => {
    const { data } = await api.get(`/user`);
    return data;
};

export const getUsersOptions = () =>
    queryOptions({
        queryKey: [GET_USERS_QUERY_KEY],
        queryFn: () => getUsers(),
    });

type UseGetUsersType = {
    queryConfig?: QueryConfig<typeof getUsersOptions>;
};

export const useGetUsers = ({ queryConfig }: UseGetUsersType) => {
    return useQuery({
        ...getUsersOptions(),
        ...queryConfig,
    });
};
