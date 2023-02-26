import React, {Component} from 'react';
import { DataGrid } from '@mui/x-data-grid';

export class TablePartner extends Component {
    render() {
        const partners = this.props.partners;
        const papers = this.props.papers;
        const r = [];
        r.push({field: 'id', headerName: "ID", width: 20});
        r.push({field: 'name', headerName: "Broker", width: 200});
        r.push({field: 'money', headerName: "Balance", flex: 1});
        papers.map((x)=>{r.push({field: x.name, headerName: x.name, flex: 1})});

        let ind = [];
        for(let i =0; i< partners.length; i++){
            ind.push({id: i+1, name: partners[i].name, money: partners[i].money});
            for(let el of partners[i].papers){
                ind[i] = Object.assign(ind[i], {[el.name]:el.count});
            }
        }
        return (
            <>
            <div style={{ height: 400}}>
                <DataGrid
                    rows={ind}
                    columns={r}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.id}
                />
            </div>
            </>
        );
    }
}
