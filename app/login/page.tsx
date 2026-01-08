"use client";
import {LoginPage} from "osp-chakra-reusable-components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ApiResponse {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  password: string;
}

export default function Login(){
    const router = useRouter();
    const [users, setUsers] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch("/api/users");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const result: ApiResponse = await response.json();
        setUsers(result);
        };

        fetchData(); // Call the function on component mount
    }, []);

    const handleSignUp = async (email: string, password: string, firstname: string, middlename: string, lastname: string, contactnumber: string) => {
        //Validate email if already exists before sending to API
        try {
            const filteredItems = Array.isArray(users) && users.length > 0
            ? users.filter(
                (user) =>
                    user.email?.toLowerCase().includes(email)
                )
            : [];  // Return an empty array if validation fails

            if (filteredItems.length > 0) {
                alert('User with this email already exists.');
                return;
            }
        } catch (error) {
            console.error('Error checking existing users:', error);
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                email: email, 
                password: password,
                firstName: firstname,
                middleName: middlename,
                lastName: lastname,
                contactNumber: contactnumber 
                }),
            });
            const newItem = await response.json();
            console.log('Added user:', newItem);
            alert('User registered successfully!');
            router.push('/');
            
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    const handleSignIn = async (email: string, password: string) => {
        //Validate email and password
        try {
            const filteredItems = Array.isArray(users) && users.length > 0
            ? users.filter(
                (user) =>
                    user.email?.toLowerCase().includes(email) &&
                    user.password === password
                )
            : [];  // Return an empty array if validation fails
            console.log("Filtered Items:", filteredItems);
            if (filteredItems.length === 0) {
                alert('Invalid email or password.');
                return;
            }
            localStorage.setItem("user_data", JSON.stringify(filteredItems[0]));
            console.log('User signed in:', filteredItems[0]);
            router.push('/account-management');
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    }

    return(
        <LoginPage onLogin={handleSignIn} onSignUp={handleSignUp}/>
    );
}