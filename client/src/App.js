import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Stack,
  LinearProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { saveAs } from "file-saver";

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchData() {
  try {
    const [accountsResp, businessUnitsResp] = await Promise.all([
      fetch(`${API_URL}/accounts`),
      fetch(`${API_URL}/business_units`),
    ]);
    const [accountsData, businessUnitsData] = await Promise.all([
      accountsResp.json(),
      businessUnitsResp.json(),
    ]);

    return {
      acc: accountsData.data,
      bu: businessUnitsData.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("");

  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);

  const columns = [
    { field: "currency", headerName: "Currency", width: 120 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "scenario", headerName: "Scenario", width: 120 },
    { field: "jan", headerName: "Jan", width: 150 },
    { field: "feb", headerName: "Feb", width: 150 },
    { field: "mar", headerName: "Mar", width: 150 },
    { field: "apr", headerName: "Apr", width: 150 },
    { field: "may", headerName: "May", width: 150 },
    { field: "jun", headerName: "Jun", width: 150 },
    { field: "jul", headerName: "Jul", width: 150 },
    { field: "aug", headerName: "Aug", width: 150 },
    { field: "sep", headerName: "Sep", width: 150 },
    { field: "oct", headerName: "Oct", width: 150 },
    { field: "nov", headerName: "Nov", width: 150 },
    { field: "dec", headerName: "Dec", width: 150 },
  ];

  useEffect(() => {
    fetchData().then(({ acc, bu }) => {
      setAccounts(acc);
      setBusinessUnits(bu);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedAccount || !selectedBusinessUnit) return;
    setRowData([]);
    setLoading(true);

    const response = await fetch(
      `${API_URL}/finance_data?account=${selectedAccount}&business_unit=${selectedBusinessUnit}`
    );
    const { data } = await response.json();
    setRowData(data);
    setLoading(false);
  };

  const handleExport = () => {
    // prettier-ignore
    const extraInfo = `Account: ${selectedAccount}, Business Unit: ${selectedBusinessUnit}`;

    // prettier-ignore
    const csvData = extraInfo + "\n" + columns.map((c) => `"${c.headerName}"`).join(",") + "\n" +

    rowData.map((r) => columns.map((c) => `"${r[c.field]}"`).join(",")).join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "export-data.csv");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "80vw",
        margin: "0 auto",
      }}
    >
      <h1>Client Assessment</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="account-label">Select Account</InputLabel>
                <Select
                  labelId="account-label"
                  id="account-select"
                  value={selectedAccount}
                  label="Account"
                  autoWidth
                  onChange={(event) => setSelectedAccount(event.target.value)}
                >
                  {accounts.map((acc) => (
                    <MenuItem key={acc} value={acc}>
                      {acc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="business-unit-label">
                  Select Business Unit
                </InputLabel>
                <Select
                  labelId="business-unit-label"
                  id="business-unit-select"
                  value={selectedBusinessUnit}
                  label="Business Unit"
                  autoWidth
                  onChange={(event) =>
                    setSelectedBusinessUnit(event.target.value)
                  }
                >
                  {businessUnits.map((bu) => (
                    <MenuItem key={bu} value={bu}>
                      {bu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                disabled={!selectedAccount || !selectedBusinessUnit}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                onClick={handleExport}
                disabled={rowData.length === 0}
              >
                Export to Excel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
      <div
        style={{ height: 400, width: "100%", marginTop: 10, marginBottom: 10 }}
      >
        <DataGrid
          slots={{
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          rows={rowData}
          columns={columns}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default App;
