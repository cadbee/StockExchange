import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import axios from "axios";
import {TablePartner} from "./tablePartner";
import '../styles/admin.css'
import {
    Button,
    ButtonGroup
} from "@mui/material";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const animatedComponents = makeAnimated()
const options = [
    {value: "APPL", label: "APPL"},
    {value: "AMD", label: "AMD"},
    {value: "AMZN", label: "AMZN"},
    {value: "QCOM", label: "QCOM"},
    {value: "CSCO", label: "CSCO"},
    {value: "MSFT", label: "MSFT"},
    {value: "SBUX", label: "SBUX"},
    {value: "TSLA", label: "TSLA"},
];
let date_opt = dayjs('2020-11-18T21:11:54');
const shift_options = [
    {value: 2, label: "2 SEC"},
    {value: 4, label: "4 SEC"},
    {value: 6, label: "6 SEC"},
    {value: 8, label: "8 SEC"},
];

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            papers: [],
            partners: [],
            isLoaded: false,
            isStart: false,
            chosenPapers: [],
            chosenDate: '12/12/2021',
            shift: 8,
        };

        this.socket = openSocket('http://localhost:3050');
        this.socket2 = openSocket('http://localhost:3050');
        this.socket.on("connect", () => {
            this.socket.emit("hello", {name: "ADMIN"});
        });
        this.socket.on('action', (msg) => {
            let temp = this.state.partners;
            this.setState({
                papers: msg.paper.map((x) => {
                    return {name: x[0], count: x[1]}
                })
            });
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].email === msg.email) {
                    temp[i].papers = msg.paper.map((x) => {
                        return {name: x[0], count: x[1]}
                    });
                    for (let j = 0; j < temp[i].papers.length; j++) {
                        if (temp[i].papers[j].name === msg.paper) {
                            if (msg.action === 'купить') {
                                temp[i].papers[j].count += parseInt(msg.count);
                                temp[i].money -= msg.deltaMoney;
                            } else {
                                temp[i].papers[j].count -= parseInt(msg.count);
                                temp[i].money += msg.deltaMoney;
                            }
                        }
                    }
                }
            }

            this.setState({partners: temp});
        });
        this.socket.on('start', () => {
            this.setState({isStart: true});
        });
        this.socket.on('end', () => {
            this.setState({isStart: false});
        });
        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.createInfoPartner = this.createInfoPartner.bind(this);
    }

    createInfoPartner(name) {
        return {name: name, count: 0};
    }

    handleChange = (newValue) => {
        date_opt = newValue;
        this.setState({chosenDate: String(((newValue['$M'] + 1) >= 10 ? (newValue['$M'] + 1) : '0' + (newValue['$M'] + 1)) + '/' + (newValue['$D'] >= 10 ? newValue['$D'] : '0' + newValue['$D']) + '/' + newValue['$y'])}, () => {
        });
    };

    componentDidMount() {
        axios.get('http://localhost:3333/admin').then((result) => {
            let partners = result.data.partners;
            for (let elem of partners) {
                elem.papers = [];
                for (let i = 0; i < result.data.papers.length; i++) {
                    elem.papers.push(this.createInfoPartner(result.data.papers[i].name))
                }
            }
            this.setState({papers: result.data.papers, partners: result.data.partners, isLoaded: true});
        });
    }

    imit() {

    }

    start() {
        this.socket.emit("start");
        this.socket2.emit("ItsTimeToTrade", {
            start: this.state.chosenDate,
            tradingShares: this.state.chosenPapers,
            shift: Number(this.state.shift)
        });
        this.setState({isStart: true});
    }

    end() {
        this.socket.emit("end");
        this.socket2.emit("StopTrading");
        this.setState({isStart: false});
    }

    chosePaper = (newPeriod) => {
        this.setState({
            chosenPapers: newPeriod.map((x) => {
                return x.value
            })
        }, () => {
        });
    }

    render() {
        const {papers, partners, isLoaded, isStart, chosenDate, shift} = this.state;
        if (!isLoaded) return <p>Загрузка...</p>;
        return (
            <>
                <div className="navBar">

                </div>
                <div className="w3-center w3-margin">
                    <div className="w3-container w3-light-green" id="admin">
                        <h3><b>ADMIN</b></h3>
                    </div>
                    <div>

                        <TablePartner papers={papers} partners={partners}/>
                    </div>
                    <div className="selects-cont">
                            <Select
                                styles={{control : (baseStyles, state)=>({...baseStyles, minWidth: 300, maxWidth: 400}),}}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={options[0]}
                                isMulti
                                options={options}
                                value={this.chosenPapers}
                                onChange={this.chosePaper}
                            />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                minDate={dayjs('2020-11-18T21:11:54')}
                                maxDate={dayjs('2022-11-17T21:11:54')}
                                disableFuture
                                label="Responsive"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={date_opt}
                                onChange={this.handleChange}
                                renderInput={(params) => <TextField size={"small"} {...params} />}
                            />
                        </LocalizationProvider>
                        <Select defaultValue={shift_options[3]} options={shift_options} value={this.shift}
                                onChange={(v) => {
                                    this.setState({shift: v.value}, () => {
                                    })
                                }}/>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={this.start} disabled={isStart}>START</Button>
                            <Button onClick={this.end} disabled={!isStart}>STOP</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </>
        )
    }
}
