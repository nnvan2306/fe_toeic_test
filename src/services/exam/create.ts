import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    title: string;
    description: string;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questions: any;
};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/exam", payload);
    return data;
};

type CreateExamType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateExam = ({ mutationConfig }: CreateExamType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
