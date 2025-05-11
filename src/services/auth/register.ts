import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    username: string;
    email: string;
    password: string;
};

const register = async (payload: PayLoadType) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
};

type RegisterType = {
    mutationConfig?: MutationConfig<typeof register>;
};

export const useRegister = ({ mutationConfig }: RegisterType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: register,
    });
};
