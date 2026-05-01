import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import { Gauge } from "@mui/x-charts/Gauge";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const TEAL_600 = "#0d9488";
const TEAL_800 = "#115e59";
const CYAN_100 = "#cffafe";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 110 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const teal = {
  50:  "#f0fdfa",
  100: "#ccfbf1",
  200: "#99f6e4",
  400: "#2dd4bf",
  600: "#0d9488",
  700: "#0f766e",
  800: "#115e59",
  900: "#134e4a",
};

const ReportsPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">

     <Box sx={{
        mb: 3, px: 3, py: 2.5,
        background: teal[600],
        borderBottom: `2px solid ${teal[800]}`,
        borderRadius: 2,
      }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#fff" }}>
          Reports
        </Typography>
        <Typography variant="body2" sx={{ color: teal[100], mt: 0.5 }}>
         Overview and analytics based on current dashboard data
        </Typography>
      </Box>


      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card sx={{ minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{rows.length}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Box sx={{ flex: 1 }}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: "Series 1", color: TEAL_600 },
              { data: [51, 6, 49, 30], label: "Series 2", color: TEAL_800 },
            ]}
            height={300}
            xAxis={[
              {
                data: ["Q1", "Q2", "Q3", "Q4"],
                scaleType: "band",
              },
            ]}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "A", color: TEAL_600 },
                  { id: 1, value: 15, label: "B", color: TEAL_800 },
                  { id: 2, value: 20, label: "C", color: CYAN_100 },
                ],
              },
            ]}
            height={300}
          />
        </Box>
      </Stack>

      {/* Table */}
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
        />
      </Box>

    </div>
  );
};

export default ReportsPage;