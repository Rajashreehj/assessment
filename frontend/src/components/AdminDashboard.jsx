import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'

const AdminDashboard = () => {
    const [ students, setstudents ] = useState([])
    const columns = [
        {
            headerName: 'Roll No.',
            field: 'rollno',
            cellClassName: "name-column--cell",
			flex: 0.1
        },
        {
            headerName: 'Name',
            field: 'name',
            cellClassName: "name-column--cell",
			flex: 0.1
        },
        {
            headerName: 'Email',
            field: 'email',
            cellClassName: "name-column--cell",
			flex: 0.1
        },
        {
            headerName: 'Address',
            field: 'address',
            cellClassName: "name-column--cell",
			flex: 0.1
        }
    ]
    useEffect(() => {
        const getStudents = async () => {
            const fetchData = await axios.get(`http://localhost:3001/fetch-students`)
            setstudents(fetchData.data)
            console.log(fetchData.data)
        }
        getStudents();
    }, [])
    return (
        <Box>
            <Typography variant='h3' sx={{ p: 5}}>Student Details</Typography>
            <Box height='70vh' width='90vw' ml={10}
                sx={{
                    '& .MuiDataGrid-columnHeader':{
                        backgroundColor: '#f2f2f2'
                    },
                    '& 	.MuiDataGrid-footerContainer': {
                        backgroundColor: '#f2f2f2'
                    }
                }}
            >
                <DataGrid  
                    columns={columns}
                    rows={students}
                />
            </Box>
        </Box>
    )
}

export default AdminDashboard