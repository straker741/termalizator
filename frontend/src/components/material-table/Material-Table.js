import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import MaterialTable from 'material-table';

import CircularProgress from '@material-ui/core/CircularProgress';

import ResponseStatusSnackbar from '../ResponseStatusSnackbar.js';
import CustomEditField from './CustomEditField.js';

/* TABLE ICONS */
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};





function MyTableWrapper({ url, validationSchema, title }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [snackbarState, setSnackbarState] = useState({
        status: 0,
        message: "",
        active: false
    });

    useEffect(() => {
        axios.get(url).then(response => {
            console.log(response.data);

            setData(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }, [url]);

    const addRow = (data) => {
        axios.post(url, data).then((response) => {
            console.log(response);
            setSnackbarState({
                status: response.status,
                message: "Successfully added a field!",
                active: true
            });
        }).catch((error) => {
            console.log(error);
            setSnackbarState({
                status: error.response.status,
                message: "Error!",
                active: true
            });
        });
    };

    const updateRow = (data) => {
        axios.put(url, data).then((response) => {
            console.log(response);
            setSnackbarState({
                status: response.status,
                message: "Successfully updated a field!",
                active: true
            });
        }).catch((error) => {
            console.log(error);
            setSnackbarState({
                status: error.response.status,
                message: "Error!",
                active: true
            });
        });
    };

    const deleteRow = (id) => {
        axios.delete(`${url}/${id}`).then((response) => {
            console.log(response);
            setSnackbarState({
                status: response.status,
                message: "Successfully removed a field!",
                active: true
            });
        }).catch((error) => {
            console.log(error);
            setSnackbarState({
                status: error.response.status,
                message: "Error!",
                active: true
            });
        });
    };


    if (isLoading) {
        return (
            <CircularProgress />
        );
    }
    else {
        return (
            <div style={{ maxWidth: "100%" }}>
                <ResponseStatusSnackbar {...snackbarState} setSnackbarState={setSnackbarState} />
                <MaterialTable
                    columns={[
                        { title: "Name", field: "name" },
                        { title: "Weight", field: "weight" },
                        { title: "Temperature", field: "temp" },
                        { title: "Time", field: "time" },
                    ]}                
                    data={data}
                    title={title}
                    icons={tableIcons}
                    editable={{
                        onRowAdd: (newData) => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    
                                    setData([...data, newData]);
                                    addRow(newData);

                                    resolve();
                                }, 600);
                            })
                        },
                        onRowUpdate: (newData, oldData) => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setData([...dataUpdate]);
                                    updateRow(newData);

                                    resolve();
                                }, 600);
                            })
                        },
                        onRowDelete: oldData => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setData([...dataDelete]);
                                    deleteRow(index);

                                    resolve();
                                }, 600);
                            })
                        }
                    }}
                    components={{
                        EditField: props => <CustomEditField {...props} validationSchema={validationSchema} />
                    }}
                    onRowClick={((event, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                    options={{
                        /* Column with action icons is the last one */
                        actionsColumnIndex: 4,
                        draggable: false,
                        padding: "dense",
                        rowStyle: rowData => ({
                            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                        }),
                        search: true,
                        paging: false,
                    }}
                />
            </div>
        );
    }
}


export default MyTableWrapper;
