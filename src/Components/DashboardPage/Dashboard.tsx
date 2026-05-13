import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DashboardDataPoint {
    label: string;
    duration: number;
}

interface DashboardProps {
    data: DashboardDataPoint[];
    xKey: keyof DashboardDataPoint;
    yKey: keyof DashboardDataPoint;
}

function AreaChartComponent ({ data, xKey, yKey }: DashboardProps) {
    return (
        <div>
            <p>Chat Messages Used</p>
            <AreaChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                data={data}
                margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
                onContextMenu={(_, e) => e.preventDefault()}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey={yKey} stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </div>
    );
}

export default AreaChartComponent;