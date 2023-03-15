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
    { field: "account_name", headerName: "Account", width: 150 },
    {
      field: "business_unit",
      headerName: "Business Unit",
      width: 150,
    },
    { field: "currency", headerName: "Currency", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "scenario", headerName: "Scenario", width: 120 },
    { field: "Jan", headerName: "Jan", width: 120 },
    { field: "Feb", headerName: "Feb", width: 120 },
    { field: "Mar", headerName: "Mar", width: 120 },
    { field: "Apr", headerName: "Apr", width: 120 },
    { field: "May", headerName: "May", width: 120 },
    { field: "Jun", headerName: "Jun", width: 120 },
    { field: "Jul", headerName: "Jul", width: 120 },
    { field: "Aug", headerName: "Aug", width: 120 },
    { field: "Sep", headerName: "Sep", width: 120 },
    { field: "Oct", headerName: "Oct", width: 120 },
    { field: "Nov", headerName: "Nov", width: 120 },
    { field: "Dec", headerName: "Dec", width: 120 },
  ];

  useEffect(() => {
    fetchData().then(({ acc, bu }) => {
      setAccounts(acc);
      setBusinessUnits(bu);
    });
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      setSelectedBusinessUnit("");
    }
  }, [selectedAccount]);

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
    const csvData = columns.map((c) => `"${c.headerName}"`).join(",") + "\n" +

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
              <FormControl sx={{ minWidth: 150 }} size="small">
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
                    <MenuItem key={acc.account_id} value={acc.account_id}>
                      {acc.account_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }} size="small">
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
                    <MenuItem
                      key={bu.business_unit_id}
                      value={bu.business_unit_id}
                    >
                      {bu.business_unit_name}
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
