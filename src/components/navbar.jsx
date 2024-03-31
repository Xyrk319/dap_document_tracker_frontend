import React, {useState, useEffect} from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import fetchUserDetails from "../utils/FetchUser";
import logout from '../utils/auth/Logout';


const NavbarComponent = () => {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    useEffect(() => {
        const loadUser = async () => {
            const userDetails = await fetchUserDetails();
            if (userDetails){
                setUser({
                    firstname: userDetails.first_name,
                    lastname: userDetails.last_name,
                    email: userDetails.email
                })
            }
        };
        loadUser();
    }, []);

    const handleLogout = () => {
        logout();
    }
    return (
        <div >
            <Navbar fluid rounded className="bg-gray-200">
                <Navbar.Brand href="#">
                    <img src="/vite.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DAP Document Tracker and Record Management System</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar img="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" 
                            alt="User settings"
                            rounded />
                    }
                    >
                    <Dropdown.Header>
                        <span className="block text-sm">{user.firstname + ' ' + user.lastname}</span>
                        <span className="block truncate text-sm font-medium">{user.email}</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
            </Navbar>
        </div>
    )
}

export default NavbarComponent