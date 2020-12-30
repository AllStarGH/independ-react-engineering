import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';
import axios from 'axios';

import MineHeader from '@/components/public/header/header';

import './usersList.less';

export default class usersList extends Component {
    constructor(props) {
        super(props);
        console.info('===UsersList-Constructor===');
        console.dir(this);
    }

    // \\\\\\\\\\\\\\\\\
    componentDidMount() {
        this.getUsersData();
    }

    // \\\\\\\\\\\\\\\\\
    state = {
        tblList: []
    }

    // 获取后台全体用户数据
    getUsersData = () => {
        let url = '/api/userContro/getUserList';

        axios.get(url)
        .then(res => {
                console.dir(res);
                if (res.data.code === 200) {
                    console.dir(res.data);

                    this.setState({
                        tblList: res.data.data
                    })
                } else {
                    console.error('unable to get data normally');
                }
            })
            .catch(err => { console.error(err) })
    }

    // \\\\\\\\\\\\\\\\\
    columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userName', headerName: 'User name', width: 160 },
        { field: 'userEmail', headerName: 'User email', width: 260 },
        { field: 'phoneNum', headerName: 'Phone Num', type: 'number', width: 160 },
        { field: 'homeAddress', headerName: 'Home address', width: 200 },
        {
            field: 'Desc',
            headerName: 'Description',
            description: 'This column has a value getter and is not sortable',
            sortable: false,
            width: 180,
            valueGetter: (params) => `${params.getValue('id')||''}: ${params.getValue('userName')||''}`
        }
    ]

    // \\\\\\\\\\\\\\\\\
    render() {
        var divContent =
            <div className="content_div">
            <div className="heads_div">
        <MineHeader targetUrl="" targetUrlName="" />
            </div>
        <div style={{height:400,width:'100%'}} className="data_grid_div">
            <DataGrid rows={this.state.tblList} columns={this.columns} pageSize={5} checkboxSelection />
            </div>
        </div>;
        /**/
        return (divContent)
    }
}