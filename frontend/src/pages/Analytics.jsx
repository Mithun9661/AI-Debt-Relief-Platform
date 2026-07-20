import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip
} from "recharts";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#36A2EB"
];

function Analytics() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await API.get(
        "/analytics/loan-distribution"
      );

      console.log("Analytics Data:", response.data);

      setData(response.data.loan_distribution);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px"
      }}
    >
      <h1>Financial Analytics</h1>

      <button
        onClick={() =>
          navigate("/negotiation-letter")
        }
        style={{
          padding: "12px 20px",
          marginBottom: "30px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Generate AI Negotiation Letter
      </button>

      {data.length === 0 ? (
        <p>No loan data available.</p>
      ) : (
        <PieChart width={600} height={450}>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="loan_type"
            cx="50%"
            cy="50%"
            outerRadius={140}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default Analytics;