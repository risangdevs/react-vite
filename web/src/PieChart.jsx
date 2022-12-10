import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function PieChartComponent({ data }) {
  const pieData = data.map((e) => {
    return { name: e["ID Year"], pops: e.Population };
  });
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {pieData[index].name}
      </text>
    );
  };

  return (
    <>
      <div className="h-96   w-1/3 my-8 mx-auto justify-center flex items-center flex-col bg-slate-50">
        <h1 className="mx-auto font-bold my-4">US Population by Year</h1>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey={"pops"}
              outerRadius={160}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              isAnimationActive={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
