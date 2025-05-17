import { Box, Heading } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import ManagerTemplate from "../../templates/ManagerTemplate";
import { useGetExams } from "../../../services/exam/get-exams";
import { useGetAllHistory } from "../../../services/history/get-all";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chart = () => {
    const { data: examSata } = useGetExams({});

    const { data: historyData } = useGetAllHistory({});

    const dataRow = useMemo(() => {
        if (examSata && historyData) {
            const countMap: Record<string, number> = {};

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (historyData?.data || []).forEach((his: { examId: any }) => {
                const examId = his.examId;
                if (examId) {
                    countMap[examId] = (countMap[examId] || 0) + 1;
                }
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const list = (examSata.data || []).map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (exam: { id: string | number; title: any }) => ({
                    id: exam.id,
                    title: exam.title,
                    count: countMap[exam.id] || 0,
                })
            );

            return list;
        }

        return [];
    }, [historyData, examSata]);

    const data = useMemo(() => {
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labels: dataRow.map((exam: { title: any }) => exam.title),
            datasets: [
                {
                    label: "Lượt làm bài",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data: dataRow.map((exam: { count: any }) => exam.count),
                    backgroundColor: "#3182CE",
                },
            ],
        };
    }, [dataRow]);

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <ManagerTemplate>
            <Box p={4}>
                <Heading size="md" mb={4}>
                    Thống kê điểm theo người dùng
                </Heading>
                <Bar data={data} options={options} />
            </Box>
        </ManagerTemplate>
    );
};

export default Chart;
