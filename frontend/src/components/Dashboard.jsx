import { Box, Grid, Typography, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();
    const email = location.state?.email;
    const [ details, setDetails ] = useState('');
    useEffect(() => {
        const getUserData = async () => {
            const fetchData = await axios.get(`http://localhost:3001/fetch-student/${email}`)
            console.log(fetchData)
            setDetails(fetchData.data[0]);
        }
        getUserData();
    }, [])
    return (
        <>
            <Box>
                <Typography variant='h3' p={5}>User Details</Typography>
                <Grid container direction='column' ml={80}>
                    <Grid container spacing={2} maxWidth={350}>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={4}>
                                <Typography textAlign='left'>Roll Number: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField variant='outlined' required fullWidth value={details.rollno} ></TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={4}>
                                <Typography textAlign='left'>Name: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField variant='outlined' disabled  required fullWidth value={details.name} ></TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={4}>
                                <Typography textAlign='left'>Email: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField variant='outlined' disabled  type='email' required fullWidth value={details.email} ></TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={4}>
                                <Typography textAlign='left'>Address: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField variant='outlined' disabled multiline rows={2}  required fullWidth value={details.address} ></TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Dashboard