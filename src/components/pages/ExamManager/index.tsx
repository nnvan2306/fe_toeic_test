import { Box, Button, HStack } from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import { useGetExams } from "../../../services/exam/get-exams";
import ActionManage from "../../molecules/ActionMAnage";
import { useMemo } from "react";
import { ExamResponseType } from "../../../types/exam";

const ExamManager = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { data } = useGetExams({});
    const exams = useMemo(
        () =>
            (data?.data || []).map((item: ExamResponseType) => ({
                ...item,
                action: (
                    <ActionManage
                        actionUpdate={() =>
                            navigate(
                                routesMap.ExamEdit.replace(
                                    "/:id",
                                    `/${item.id}`
                                )
                            )
                        }
                    />
                ),
            })),
        [data]
    );

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
                        { key: "title", label: "Title", w: "20%" },
                        { key: "type", label: "type", w: "20%" },
                        { key: "description", label: "description", w: "40%" },
                        { key: "action", label: "" },
                    ]}
                    data={exams}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default ExamManager;
