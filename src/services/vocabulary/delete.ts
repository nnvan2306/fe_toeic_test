import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

const deleteVocabulary = async (id: number) => {
    const { data } = await api.delete(`/vocabulary/${id}`);
    return data;
};

type DeleteType = {
    mutationConfig?: MutationConfig<typeof deleteVocabulary>;
};

export const useDeleteVocabulary = ({ mutationConfig }: DeleteType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteVocabulary,
    });
};
