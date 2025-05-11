import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const GET_EXAMS_QUERY_KEY = "users";

const getUsers = async () => {
    const { data } = await api.get(`/exam`);
    return data;
};

export const getExamsOptions = () =>
    queryOptions({
        queryKey: [GET_EXAMS_QUERY_KEY],
        queryFn: () => getUsers(),
    });

type UseGetUsersType = {
    queryConfig?: QueryConfig<typeof getExamsOptions>;
};

export const useGetExams = ({ queryConfig }: UseGetUsersType) => {
    return useQuery({
        ...getExamsOptions(),
        ...queryConfig,
    });
};
