import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    email: string;
    password: string;
};

const login = async (payload: PayLoadType) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
};

type LoginType = {
    mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = ({ mutationConfig }: LoginType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: login,
    });
};
