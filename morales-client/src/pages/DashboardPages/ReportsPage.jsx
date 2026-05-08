import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const TEAL_50 = "#f0fdfa";
const TEAL_100 = "#ccfbf1";
const TEAL_600 = "#0d9488";
const TEAL_800 = "#115e59";
const CYAN_100 = "#cffafe";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  { field: "age", headerName: "Age", type: "number", width: 110, editable: true },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
  },
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

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page { size: A4; margin: 16mm; }

            body {
              margin: 0;
              font-family: Arial;
              background: #fff;
              color: #1f2937;
            }

            .report-shell { padding: 20px; }

            .report-header {
              margin-bottom: 24px;
              padding-bottom: 12px;
              border-bottom: 1px solid #d1d5db;
            }

            .report-header h1 {
              margin: 0;
              font-size: 28px;
            }

            .report-header p {
              margin: 4px 0;
              font-size: 14px;
              color: #6b7280;
            }

            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
            }
          </style>
        </head>

        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview and performance breakdown</p>
              <p>Generated: ${exportedAt}</p>
            </header>

            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>

      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4">Reports</Typography>
          <Typography variant="body1" color="text.secondary">
            Report analytics overview showing generated reports, category
            breakdown, and completion performance.
          </Typography>
        </Box>

        {/* ✅ RESTORED ORIGINAL BUTTON STYLES */}
        <Stack direction="row" spacing={1.5} flexWrap="wrap">

          <Button
            variant="contained"
            sx={{
              backgroundColor: TEAL_600,
              "&:hover": {
                backgroundColor: TEAL_800,
              },
            }}
          >
            Generate
          </Button>

          <Button
            variant="outlined"
            onClick={handlePrint}
            sx={{
              borderColor: TEAL_600,
              color: TEAL_600,
              "&:hover": {
                borderColor: TEAL_800,
                backgroundColor: CYAN_100,
              },
            }}
          >
            Export PDF
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: TEAL_600,
              color: TEAL_600,
              "&:hover": {
                borderColor: TEAL_800,
                backgroundColor: CYAN_100,
              },
            }}
          >
            Filter
          </Button>

        </Stack>
      </Stack>

      {/* ✅ PRINTABLE AREA */}
      <Box ref={printRef}>

        {/* BAR */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Monthly Report Output</Typography>

            <BarChart
              height={300}
              series={[
                { data: [10, 24, 20, 27], label: "Generated", color: TEAL_600 },
                { data: [12, 19, 17, 23], label: "Completed", color: TEAL_800 },
              ]}
              xAxis={[
                { data: ["Jan", "Feb", "Mar", "Apr"], scaleType: "band" },
              ]}
            />
          </CardContent>
        </Card>

        {/* PIE + GAUGE */}
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3} sx={{ mb: 4 }}>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Report Category Share</Typography>

              <PieChart
                width={280}
                height={220}
                series={[
                  {
                    data: [
                      { id: 1, value: 14, label: "Sales", color: TEAL_600 },
                      { id: 2, value: 18, label: "Users", color: TEAL_800 },
                      { id: 3, value: 8, label: "Inventory", color: CYAN_100 },
                    ],
                  },
                ]}
              />
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Completion Rate</Typography>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Gauge width={180} height={180} value={78} />
              </Box>
            </CardContent>
          </Card>

        </Stack>

      </Box>

      {/* TABLE */}
      <Card>
        <CardContent>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            checkboxSelection
          />
        </CardContent>
      </Card>

    </Box>
  );
};

export default ReportsPage;