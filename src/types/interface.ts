export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: string;
}

export interface IResponse<T> {
    data: T;
    message: string;
    status: number;
}
