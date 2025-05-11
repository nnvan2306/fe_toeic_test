import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type

const createToDo = async (payload: FormData) => {
    const { data } = await api.post("/upload/single", payload);
    return data;
};

type CreateToDoType = {
    mutationConfig?: MutationConfig<typeof createToDo>;
};

export const useUploadFile = ({ mutationConfig }: CreateToDoType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createToDo,
    });
};
