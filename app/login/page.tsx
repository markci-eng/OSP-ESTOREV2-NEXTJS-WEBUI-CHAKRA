"use client";
// import {LoginPage} from "osp-chakra-reusable-components";
import { LoginPage } from "@splpi/signin-signup";
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
    const [rawId, setRawId] = useState<Uint8Array | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/users");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result: ApiResponse = await response.json();
            setUsers(result);

            const data = await navigator.credentials.get({
            publicKey:{
                challenge: new Uint8Array([0, 1, 2, 3, 4, 5, 6]),
                allowCredentials: [{type: "public-key", id: rawId ?? new Uint8Array([0])}]
            }
        })
        };

        fetchData();
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
        const data = await navigator.credentials.create({ publicKey: {
                challenge: new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8]),
                rp: { name: "OSP eStore" },
                user: {
                    id: new Uint8Array(16),
                    name: email,
                    displayName: email,
                },
                pubKeyCredParams: [
                    { type: "public-key", alg: -7 },
                    { type: "public-key", alg: -8 },
                    { type: "public-key", alg: -257 },
                ]
            } })
            setRawId(new Uint8Array((data as PublicKeyCredential).rawId));
            console.log(data)
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
            router.push('/plan-management');
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    }

    return(
        <LoginPage onLogin={handleSignIn} onSignUp={handleSignUp}/>
    );
}
