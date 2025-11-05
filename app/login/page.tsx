"use client";
import LoginPage from "./loginpage";

export default function Login(){
    return(<LoginPage onLogin={(email, password) => {alert("Hello " + email)}} onSignUp={() => {}}/>);
}