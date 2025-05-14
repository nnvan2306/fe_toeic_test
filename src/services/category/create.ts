import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    title: string;
};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/category", payload);
    return data;
};

type CreateCategoryType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateCategory = ({ mutationConfig }: CreateCategoryType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
