import { Box, Button, HStack } from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";

const ExamManager = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <ManagerTemplate>
            <Box px={5}>
                <TitleManage title={t("examManage.title")} />
                <HStack justifyContent="end" mb={2}>
                    <Button onClick={() => navigate(routesMap.ExamNew)}>
                        New
                    </Button>
                </HStack>
                <TableCommon
                    columns={[
                        { key: "a", label: "A" },
                        { key: "b", label: "B" },
                    ]}
                    data={[]}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default ExamManager;
