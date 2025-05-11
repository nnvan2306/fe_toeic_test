import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";
import { UserResponseType } from "../../types/user";

type PayLoadType = {} & UserResponseType;
const deleteUser = async (payload: PayLoadType) => {
    const { data } = await api.put(`/user`, payload);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof deleteUser>;
};

export const useUpdateUser = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteUser,
    });
};
