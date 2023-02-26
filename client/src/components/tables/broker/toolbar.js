import {useDispatch, useSelector} from "react-redux";
import qs from "qs";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from "@mui/icons-material/FilterList";
import * as React from "react";
import {useEffect} from "react";
import {fetchBrokers} from "../../../asyncActions/brokers";
import {TextField} from "@mui/material";
let editMode = false;
let addPopup = false;

export const showPopup = ()=>{
    addPopup = !addPopup;
    if(addPopup){
        document.querySelector("#set_cont").style.filter = "blur(2px) opacity(0.8) brightness(0.7)";
        document.querySelector(".popup").style.display = "block";

    }
    else{
        document.querySelector("#set_cont").style.filter = "none";
        document.querySelector(".popup").style.display = "none";
    }
}



export function EnhancedTableToolbar(props) {
    const dispatch = useDispatch();
    const { numSelected, selected } = props;
    const brokers_data = useSelector(state => state.brokerReducer.brokers);
    const [money, setMoney] = React.useState(0);
    const [brokers, loadBrokers] = React.useState(brokers_data);

    useEffect(() => {
        document.querySelector("#standard-basic").style.display = "none";
        loadBrokers(brokers_data);
    }, [brokers_data])
    const delBroker = (selected)=>{
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: qs.stringify({brokers: selected}),
            url: 'http://localhost:3333/delete'
        };
        axios(options).then(res => {
            // console.log("res: ", res);
        });
        dispatch(fetchBrokers());
    };
    const handleEditMoney=(e)=>{
        setMoney(Number(e.target.value));
    }
    let editBroker = ()=>{
        if(editMode){
            let name_br = selected[0];
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: qs.stringify({name: name_br, money: Number(money)}),
                url: 'http://localhost:3333/editbroker'
            };
            axios(options).then(r => {});
            dispatch(fetchBrokers());
            document.querySelector("#standard-basic").style.display = "none";
            editMode = !editMode;
        }
        else{
            document.querySelector("#standard-basic").style.display = "block";
            editMode = !editMode;
        }
        console.log(editMode);
    }
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Brokers List
                </Typography>
            )}
            <TextField value={money} id="standard-basic" label="Standard" variant="standard" onChange={handleEditMoney}/>
            <Tooltip style={selected.length === 1? {display:"flex"}:{display:"none"}} title="Edit">
                <IconButton onClick={()=>{editBroker()}}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add">
                <IconButton onClick={()=>{showPopup()}}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={()=>{delBroker(selected)}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}