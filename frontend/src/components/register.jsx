import React, {useState} from 'react'
import { Box, Typography, TextField, Grid, Container, Button, Alert, Dialog, DialogTitle, DialogActions  } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [ userData, setUserData ] = useState({
        rollno: '',
        name: '',
        email: '',
        address: '',
        password: ''
    })
    const registerUser = async () => {
        const fetchData = await axios.post('http://localhost:3001/register', userData)
        console.log(fetchData)
        if(!fetchData.data.success){
            console.log(fetchData.data);
            setErrorMessage(fetchData.data.message)
            setUserData({
                rollno: '',
                name: '',
                email: '',
                address: '',
                password: ''
            })
        } else if(fetchData.data.success) {
            setErrorMessage('')
            console.log('Save successfully')
            navigate('/dashboard')
        }
    }
    return( <>
        <Box>
            <Grid container justifyContent='center' alignItems='center'>
                <Box component='form' sx={{marginTop: 8, backgroundColor: '#f2f2f2', p: 5, borderRadius: 3 }} onSubmit={registerUser}>
                    <Grid item pb={3}>
                        <Typography variant='h5'>Sign Up</Typography>
                    </Grid>
                    <span color='red'>{errorMessage}</span>
                    <Grid container spacing={2} maxWidth={350}>
                        <Grid item xs={12}>
                            <TextField variant='outlined' label="Roll Number" required fullWidth value={userData.rollno} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    rollno: e.target.value
                                })
                            }}></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant='outlined' label="Name" required fullWidth value={userData.name} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    name: e.target.value})
                            }}></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant='outlined' label="Email" type='email' required fullWidth value={userData.email} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    email: e.target.value
                                })
                            }}></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant='outlined' multiline rows={2} label="Address" required fullWidth value={userData.address} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    address: e.target.value
                                })
                            }}></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant='outlined' label="Password" type='password' required fullWidth value={userData.password} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    password: e.target.value
                                })
                            }}></TextField>
                        </Grid>
                        {/* <Grid item>
                            <Link style={{ textDecoration: 'none'}} to={navigate('/login')}>Already have an account? Sign In</Link>
                        </Grid> */}
                        <Grid item xs={12} mt={3}>
                            <Button variant='contained' onClick={registerUser} >Register</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    </>)
}

export default Registration