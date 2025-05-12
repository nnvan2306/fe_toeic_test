import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    userId: number;
    examId: number;
    time: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questions: any;
};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/history", payload);
    return data;
};

type CreateHistoryType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateHistory = ({ mutationConfig }: CreateHistoryType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
