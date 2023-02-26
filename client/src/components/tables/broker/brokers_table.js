import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import '../../../styles/settings.css'
import {EnhancedTableToolbar, showPopup} from "./toolbar";
import {EnhancedTableHead} from "./tablehead";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchBrokers} from "../../../asyncActions/brokers";
import qs from "qs";
import axios from "axios";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable(props) {
    const dispatch = useDispatch();
    let rows = props.brok;
    const brokers_data = useSelector(state => state.brokerReducer.brokers);

    const [brokers, loadBrokers] = React.useState(brokers_data);
    const [notLoaded, setLoad] = useState(true);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('money');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [userName, setUserName] = React.useState("Artyom");
    const [userMoney, setUserMoney] = React.useState(0);
    const [userEmail, setUserEmail] = React.useState('aschiam.net@gmail.com');
    useEffect(() => {
        if(notLoaded){
            dispatch(fetchBrokers());
            setLoad(false);
        }
    }, []);
    useEffect(() => {
        loadBrokers(brokers_data);
    }, [brokers_data]);
    rows = brokers;
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }
    const handleUserMoneyChange = (e) => {
        setUserMoney(Number(e.target.value));
    }
    const handleUserEmailChange = (e) => {
        setUserEmail(e.target.value);
    }
    const saveData = () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: qs.stringify({name: userName, money: Number(userMoney), email: userEmail}),
            url: 'https://stock-exchange-8of7.onrender.com/addbroker'
        };
        axios(options).then(r => {});
        dispatch(fetchBrokers());
        showPopup();
    }
    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <>
            <div className="popup">
                <button onClick={()=>{showPopup()}}>&times;</button>
                <h2>Add broker</h2>
                <div>
                    <input value={userName} onChange={handleUserNameChange} placeholder="FIO"
                           autoFocus={true} className="w3-input w3-text-indigo w3-border-teal"/>
                    <input value={userMoney} onChange={handleUserMoneyChange} type="number" placeholder="Balance"
                           autoFocus={true} className="w3-input w3-text-indigo w3-border-teal"/>
                    <input value={userEmail} onChange={handleUserEmailChange} placeholder="Email"
                           autoFocus={true} className="w3-input w3-text-indigo w3-border-teal"/>
                </div>
                <a id="close" onClick={()=>{saveData()}}>Let's Go</a>
            </div>
        <Box id="set_cont" sx={{ width: '100%' }} >
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected}/>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.sort(getComparator(order, orderBy)).slice()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="right">{row.money}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
        </>
    );
}