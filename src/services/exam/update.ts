import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
    title: string;
    description: string;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questions: any;
};

const update = async (payload: PayLoadType) => {
    const { id, ...newData } = payload;
    const { data } = await api.put(`/exam/${id}`, newData);
    return data;
};

type UpdateExamType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useUpdateExam = ({ mutationConfig }: UpdateExamType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
