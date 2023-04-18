import { Box, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { VITE_GATEWAY_CLIENT_API } from "../../tools";

const Transactions = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const onMintValueChange = (e) => {
    setValue(e.target.value);
  };

  const onBurnValueChange = (e) => {
    setValue(e.target.value);
  };

  const onMint = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response = await axios
      .post(
        `${VITE_GATEWAY_CLIENT_API}/token/submit`,
        {
          fcn: "Mint",
          args: [value],
        },
        { withCredentials: true }
      )
      .catch((err) => {
        setError(err.response.data.message);
        setOpen(true);
        setLoading(false);
      });

    if (response.status === 200) {
      setValue(0);
    }
    setLoading(false);
  };

  const onBurn = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response = await axios
      .post(
        `${VITE_GATEWAY_CLIENT_API}/token/submit`,
        {
          fcn: "Burn",
          args: [value],
        },
        { withCredentials: true }
      )
      .catch((err) => {
        setError(err.response.data.message);
        setOpen(true);
        setLoading(false);
      });

    if (response.status === 200) {
      setValue(0);
    }
    setLoading(false);
  };

  const mint = (
    <Box>
      <TextField
        id="mint"
        label="Mint"
        value={value}
        onChange={onMintValueChange}
        required
      />
      <LoadingButton variant="contained" onClick={onMint} loading={loading}>
        Mint
      </LoadingButton>
    </Box>
  );

  const burn = (
    <Box>
      <TextField
        id="burn"
        label="Burn"
        value={value}
        onChange={onBurnValueChange}
        required
      />
      <LoadingButton variant="contained" onClick={onBurn} loading={loading}>
        Burn
      </LoadingButton>
    </Box>
  );

  return (
    <Card>
      <CardContent>{mint}</CardContent>
      <CardContent>{burn}</CardContent>
    </Card>
  );
};

export default Transactions;
