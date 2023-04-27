import {
  Box,
  Card,
  CardContent,
  FormLabel,
  TextField,
  CardHeader,
  CardActions,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { VITE_GATEWAY_CLIENT_API } from "../../tools";
import {
  addEvent,
  balanceOf,
  burnToken,
  getClientAccountBalance,
  getTotalSupply,
  mintToken,
} from "../../redux/actions";
import { transferTo } from "../../redux/actions";
import EventViewer from "../EventViewer/EventViewer";
import DialogPopUp from "../DialogPopUp/DialogPopUp";
import { clearError } from "../../redux/actions/index";

const Transactions = ({ admin, label }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userData.username);
  const error = useSelector((state) => state.user.error);
  const [mintValue, setMintValue] = useState(0);
  const minted = useSelector((state) => state.token.minted);
  const [burnValue, setBurnValue] = useState(0);
  const burned = useSelector((state) => state.token.burned);
  const balanceOfClient = useSelector((state) => state.token.client.balance);
  const totalSupplyValue = useSelector((state) => state.token.totalSupply);
  const [transferValue, setTransferValue] = useState(0);
  const [toValue, setToValue] = useState("");
  const [loadingMint, setLoadingMint] = useState(false);
  const [loadingBurn, setLoadingBurn] = useState(false);
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [clientAccount, setClientAccount] = useState("");
  let newTransaction = {
    type: "",
    amount: 0,
    from: "",
    to: "",
  };

  useEffect(() => {
    if (minted !== 0 || burned !== 0) {
      setMintValue(0);
      setBurnValue(0);
      newTransaction = {
        type: "",
        amount: 0,
        from: "",
        to: "",
      };
    }
  }, [minted, burned]);

  const onMintValueChange = (e) => {
    setMintValue(e.target.value);
  };

  const onBurnValueChange = (e) => {
    setBurnValue(e.target.value);
  };

  const onTransferValueChange = (e) => {
    setTransferValue(e.target.value);
  };

  const onToValueChange = (e) => {
    setToValue(e.target.value);
  };

  const onClientAccountChange = (e) => {
    setClientAccount(e.target.value);
  };

  const onMint = (e) => {
    e.preventDefault();
    setLoadingMint(true);
    dispatch(mintToken(admin, mintValue)).then(() => {
      if (error) {
        setMessage(error);
        setTitle("Error");
        setOpen(true);
      } else {
        newTransaction = {
          type: "mint",
          amount: mintValue,
          from: "0x000",
          to: username,
        };
        dispatch(addEvent(newTransaction));
        setMessage("Token Minted successfully");
        setTitle("Success");
        setOpen(true);
      }
      if (admin === "true") {
        dispatch(getTotalSupply(admin));
      } else {
        dispatch(getClientAccountBalance(false));
      }
      setLoadingMint(false);
    });
  };

  const onBurn = (e) => {
    e.preventDefault();
    setLoadingBurn(true);
    dispatch(burnToken(admin, burnValue)).then(() => {
      if (error) {
        setMessage(error);
        setTitle("Error");
        setOpen(true);
      } else {
        newTransaction = {
          type: "burn",
          amount: burnValue,
          from: username,
          to: "0x000",
        };
        dispatch(addEvent(newTransaction));
        setMessage("Token Burned successfully");
        setTitle("Success");
        setOpen(true);
      }
      if (admin === "true") {
        dispatch(getTotalSupply(admin));
      } else {
        dispatch(getClientAccountBalance(false));
      }
      setLoadingBurn(false);
    });
  };

  const onTransfer = (e) => {
    e.preventDefault();
    setLoadingTransfer(true);
    let client = setClient(toValue);
    dispatch(transferTo(admin, client, transferValue)).then(() => {
      if (error) {
        setMessage(error);
        setTitle("Error");
        setOpen(true);
      } else {
        newTransaction = {
          type: "transfer",
          amount: transferValue,
          from: username,
          to: toValue,
        };
        dispatch(addEvent(newTransaction));
        setMessage("Token Transfer successfully");
        setTitle("Success");
        setOpen(true);
      }
      if (admin === "true") {
        dispatch(getTotalSupply(admin));
      } else {
        dispatch(getClientAccountBalance(false));
      }
      setLoadingTransfer(false);
    });
  };

  const onClientBalance = (e) => {
    e.preventDefault();
    setLoadingBalance(true);
    let account = setClient(clientAccount);
    dispatch(balanceOf(admin, account)).then(() => {
      if (error) {
        setMessage(error);
        setTitle("Error");
        setOpen(true);
      }
      setLoadingBalance(false);
    });
  };

  const mint = (
    <Box>
      <TextField
        id="mint"
        label="Mint"
        value={mintValue}
        onChange={onMintValueChange}
        required
      />
      <LoadingButton variant="contained" onClick={onMint} loading={loadingMint}>
        Mint
      </LoadingButton>
    </Box>
  );

  const burn = (
    <Box>
      <TextField
        id="burn"
        label="Burn"
        value={burnValue}
        onChange={onBurnValueChange}
        required
      />
      <LoadingButton variant="contained" onClick={onBurn} loading={loadingBurn}>
        Burn
      </LoadingButton>
    </Box>
  );

  const transfer = (
    <Box>
      <FormLabel>Transfer</FormLabel>
      <TextField
        id="value"
        label="value"
        value={transferValue}
        onChange={onTransferValueChange}
        required
      />
      <TextField
        id="to"
        label="to"
        value={toValue}
        onChange={onToValueChange}
        required
      />
      <LoadingButton
        variant="contained"
        onClick={onTransfer}
        loading={loadingTransfer}
      >
        Transfer
      </LoadingButton>
    </Box>
  );

  const balance = (
    <Box>
      <FormLabel>Balance</FormLabel>
      <TextField
        id="client"
        label="account"
        value={clientAccount}
        onChange={onClientAccountChange}
        required
      />
      <LoadingButton
        variant="contained"
        onClick={onClientBalance}
        loading={loadingBalance}
      >
        Get Balance
      </LoadingButton>
      <Typography variant="h6">{balanceOfClient}</Typography>
    </Box>
  );

  const totalSupply = (
    <Box>
      <Typography variant="h6">Total Supply: {totalSupplyValue}</Typography>
    </Box>
  );

  const onDialogClose = () => {
    setOpen(false);
    dispatch(clearError());
  };

  const setClient = (client) => {
    return `x509::/OU=client/CN=${client}::/C=ES/L=Alicante/=Alicante/O=ClientMSP/OU=Tech/CN=ca`;
  };

  const addNewEvent = (event) => {
    dispatch(addEvent(event));
  };

  return (
    <div>
      <Card>
        <CardHeader title={label} />
        {admin === "true" ? (
          <div>
            <CardContent>{totalSupply}</CardContent>
            <CardContent>{mint}</CardContent>
            <CardContent>{burn}</CardContent>
            <CardContent>{balance}</CardContent>
          </div>
        ) : (
          <></>
        )}
        <CardContent>{transfer}</CardContent>
        <CardActions>
          <EventViewer />
        </CardActions>
      </Card>
      <DialogPopUp
        open={open}
        title={title}
        message={message}
        close={onDialogClose}
      />
    </div>
  );
};

export default Transactions;
