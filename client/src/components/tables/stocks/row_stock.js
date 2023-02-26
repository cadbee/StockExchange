import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {fetchAddStocks, fetchStocks} from "../../../asyncActions/stocks";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {useEffect, useState} from "react";
import Select from "react-select";

const options_period = [
    {value: 1, label: "2Y"},
    {value: 2, label: '1Y'},
    {value: 24, label: '1M'},
];

export default function Row(props) {
    const {name} = props;
    const stocks_data = useSelector(state => state.stockReducer.stocks);
    let values = [];
    const [notLoaded, setLoad] = useState(true);
    const [period, setPeriod] = useState(24)

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const onOpen = ()=>{
        setOpen(!open);
    }
    useEffect(() => {
        if(notLoaded){
            dispatch(fetchAddStocks(name));
            setLoad(false);
        }
    }, [])
    const changePeriod = (newPeriod) => {
        setPeriod(newPeriod);
    }
    for(let el of stocks_data){
        if(el.name === name){
            values = el.data.slice(0, Math.floor(el.data.length/period.value));
        }
    }
    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {onOpen()}}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell align="right">  <Select defaultValue={period} options={options_period} value={period} onChange={changePeriod}/>
                    </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Close/Last</TableCell>
                                        <TableCell align="right">Volume</TableCell>
                                        <TableCell align="right">Open</TableCell>
                                        <TableCell align="right">High</TableCell>
                                        <TableCell align="right">Low</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {values.map((historyRow) => (
                                        <TableRow key={historyRow["Date"]}>
                                            <TableCell component="th" scope="row">
                                                {historyRow["Date"]}
                                            </TableCell>
                                            <TableCell>{historyRow["Close/Last"]}</TableCell>
                                            <TableCell align="right">{historyRow["Volume"]}</TableCell>
                                            <TableCell align="right">{historyRow["Open"]}</TableCell>
                                            <TableCell align="right">{historyRow["High"]}</TableCell>
                                            <TableCell align="right">{historyRow["Low"]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
