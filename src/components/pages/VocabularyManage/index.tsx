import { Box } from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TableCommon from "../../organisms/TableCommon";
import { useGetVocabularys } from "../../../services/vocabulary/get-all";
import { useMemo } from "react";
import ActionManage from "../../molecules/ActionMAnage";
import { VocabularyResponseType } from "../../../types/vocabulary";

const VocabularyManage = () => {
    const { data, refetch } = useGetVocabularys({});
    const vocabularies = useMemo(
        () =>
            (data?.data || []).map((item: VocabularyResponseType) => ({
                ...item,
                action: (
                    <ActionManage
                        actionDelete={() => {
                            // setIdDelete(item.id);
                            // onOpenDelete();
                        }}
                        actionUpdate={() => {
                            // setDataUpdate(item);
                            // onOpen();
                        }}
                    />
                ),
            })),
        [data]
    );
    return (
        <ManagerTemplate>
            <Box>
                <TableCommon
                    columns={[
                        { key: "title", label: "title", w: "50%" },

                        {
                            key: "action",
                            label: "",
                            w: "20%",
                        },
                    ]}
                    data={vocabularies}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default VocabularyManage;
