import React, {useState} from 'react'
import { Box, Typography, TextField, Grid, Container, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Admin@123';
    const [errorMessage, setErrorMessage] = useState('')
    const [ userData, setUserData ] = useState({
        email: '',
        password: ''
    })
    const loginUser = async () => {
        if(userData.email === adminEmail && userData.password === adminPassword){
            console.log(userData)
            navigate('/admin-dashboard')
        } else {
            const fetchData = await axios.get(`http://localhost:3001/fetch-user/${userData.email}/${userData.password}`)
            if(!fetchData.data.success){
                console.log(fetchData.data);
                setErrorMessage(fetchData.data.message)
                setUserData({
                    email: '',
                    password: ''
                })
            } else if(fetchData.data.success) {
                setErrorMessage('')
                navigate('/dashboard', {state: {email: userData.email}})
            }
            // if(fetchData.data[0].rollno){
            //     navigate('')
            // } else {
    
            // }
            console.log(fetchData)
        }
    }
    return(
        <Box sx={{ paddingTop: 20 }}>
        <Container maxWidth='xs'>
            <Box p={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',  backgroundColor: '#f2f2f2', borderRadius: 3 }}>
                <Typography variant='h5'>Sign In</Typography>
                <span color='red'>{errorMessage}</span>
                <Box component='form' sx={{marginTop: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField variant='outlined' label="Email" type='email' required fullWidth value={userData.email} onChange={(e) => {
                                setUserData({
                                    ...userData,
                                    email: e.target.value
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
                            <Link style={{ textDecoration: 'none'}} to={navigate('/register')}>Don't have an account? Sign Up</Link>
                        </Grid> */}
                        <Grid item xs={12} mt={3}>
                            <Button variant='contained' onClick={loginUser} >Login</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        </Box>
    )
}

export default Login