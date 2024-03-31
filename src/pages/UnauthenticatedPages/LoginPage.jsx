import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button, 
    Checkbox, 
    Label, 
    TextInput,
    Card
} from "flowbite-react";
import GuestLayout from '../Layouts/GuestLayout';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();

    // Example state for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            // Use Axios to send a POST request
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                email: email,
                password: password
            });
    
            // Store both the access and refresh tokens
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
    
            navigate('/dashboard'); // Redirect to the dashboard after successful login
        } catch (error) {
            console.error("Login failed", error);
        }
    };


    return (
        <GuestLayout>
            <Card className="w-96">
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput id="email" type="email" placeholder="Enter your email" required 
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput id="password" type="Enter your password" required 
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Card>
        </GuestLayout>
    );
};

export default LoginPage;
