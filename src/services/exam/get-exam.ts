import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const GET_EXAM_QUERY_KEY = "exam";

const getExam = async (id: number) => {
    const { data } = await api.get(`/exam/${id}`);
    return data;
};

export const getExamOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_EXAM_QUERY_KEY],
        queryFn: () => getExam(id),
    });

type UseGetUserType = {
    queryConfig?: QueryConfig<typeof getExamOptions>;
    id: number;
};

export const useGetExam = ({ queryConfig, id }: UseGetUserType) => {
    return useQuery({
        ...getExamOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
