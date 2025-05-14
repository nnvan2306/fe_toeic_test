import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
    word: string;
    definition: string;
    example: string;
    categoryId: number;
};

const update = async (payload: PayLoadType) => {
    const { id, ...newData } = payload;
    const { data } = await api.put(`/vocabulary/${id}`, newData);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useUpdateVocabulary = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
