import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';

import MineHeader from '@/components/public/header/header';

// import axios from 'axios';

import './usersList.less';

export default class usersList extends Component {
    constructor(props) {
        super(props);
        console.info('===UsersList-Constructor===');
        console.dir(this);
    }

    // \\\\\\\\\\\\\\\\\
    columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'age', headerName: 'Age', type: 'number', width: 90 },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable',
            sortable: false,
            width: 240,
            valueGetter: (params) => `${params.getValue('firstName')||''} ${params.getValue('lastName')||''}`
        }
    ]

    // \\\\\\\\\\\\\\\\\
    rows = [
        { id: 1, lastName: 'Olivar', firstName: 'Wales', age: 33 },
        { id: 2, lastName: 'Bersaka', firstName: 'Queenzyn', age: 30 },
        { id: 3, lastName: 'Izmos', firstName: 'Nokaus', age: 13 },
        { id: 4, lastName: 'Kendy', firstName: 'Deran', age: 22 },
        { id: 5, lastName: 'Narui', firstName: 'Paritor', age: 65 },
        { id: 6, lastName: 'Samura', firstName: 'Frotar', age: 37 },
        { id: 7, lastName: 'Ultra', firstName: 'Vivan', age: 32 },
        { id: 8, lastName: 'Alion', firstName: 'Landex', age: 28 },
        { id: 9, lastName: 'Kendra', firstName: 'Hedas', age: 19 },
        { id: 10, lastName: 'Taylor', firstName: 'Mex', age: 55 },
        { id: 11, lastName: 'Massya', firstName: 'Mosara', age: 49 },
        { id: 12, lastName: 'Gerce', firstName: 'Uenion', age: 18 },
        { id: 13, lastName: 'Rilyes', firstName: 'Kelots', age: 12 },
        { id: 14, lastName: 'Yamobu', firstName: 'Jany', age: 36 },
        { id: 15, lastName: 'Cecres', firstName: 'Fuamx', age: 34 },
        { id: 16, lastName: 'Eakles', firstName: 'Fyler', age: 24 },
        { id: 17, lastName: 'Sraye', firstName: 'Ziones', age: 16 },
        { id: 18, lastName: 'Chareick', firstName: 'Dreox', age: 11 },
        { id: 19, lastName: 'Tarenz', firstName: 'Phillam', age: 44 },
        { id: 20, lastName: 'Marnes', firstName: 'Ivania', age: 40 }
    ]

    // \\\\\\\\\\\\\\\\\
    // TODO 顶部导航栏
    render() {
        var divContent =
            <div className="content_div">
            <div className="heads_div">
        <MineHeader targetUrl="" targetUrlName="" />
            </div>
        <div style={{height:400,width:'100%'}} className="data_grid_div">
            <DataGrid rows={this.rows} columns={this.columns} pageSize={5} checkboxSelection />
            </div>
        </div>;
        /**/
        return (divContent)
    }
}