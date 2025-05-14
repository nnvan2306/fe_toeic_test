import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
    title: string;
};

const update = async (payload: PayLoadType) => {
    const { id, ...newData } = payload;
    const { data } = await api.put(`/category/${id}`, newData);
    return data;
};

type UpdateCategoryType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useUpdateCategory = ({ mutationConfig }: UpdateCategoryType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
