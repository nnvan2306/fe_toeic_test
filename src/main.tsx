import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/index.ts"; // 👈 import i18n instance
import queryClient from "./libs/query.ts";
import theme from "./theme/index.ts";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
                {" "}
                {/* 👈 Bọc ở đây */}
                <App />
            </I18nextProvider>
        </ChakraProvider>
    </QueryClientProvider>
);
