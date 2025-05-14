export const formatDate = (data: string) => {
    const date = new Date(data);
    return new Intl.DateTimeFormat("vi-VN").format(date);
};
