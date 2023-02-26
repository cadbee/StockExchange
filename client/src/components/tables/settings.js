import React, {Component} from "react";
import '../../styles/settings.css'
import axios from "axios";
import EnhancedTable from "./broker/brokers_table";
import CollapsibleTable from "./stocks/stocks_table";

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brokers: [],
        };
        this.delBroker= this.delBroker.bind(this);

    }

    componentDidMount() {
        axios.get('https://stock-exchange-00lx.onrender.com/admin').then((result) => {
            this.setState({brokers: result.data.partners});
        });
    }
    delBroker(name){
        axios.get('https://stock-exchange-00lx.onrender.com/admin').then((result) => {
            this.setState({brokers: result.data.partners});
        });
    }
    render() {
        const {brokers} = this.state;
        let stock = ["APPL", "AMD", "AMZN", "QCOM", "CSCO", "MSFT", "SBUX", "TSLA"];
        return (
            <>
                <div className="set_cont">
                    <EnhancedTable brok={brokers}/>
                    <CollapsibleTable stock={stock}/>
                </div>
            </>
        )
    }
}