import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import MyButton from "../components/MyButton";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("admin") || localStorage.getItem("kasir")) {
            return navigate("/");
        }
    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (username == "" || password == "") {
                return alert("Data tidak boleh kosong");
            }
            const res = await axios.post(
                import.meta.env.VITE_BE + "/user/login",
                {
                    username: username,
                    password: password,
                }
            );
            if (!res.data.success) {
                return alert(res.data.message);
            }
            localStorage.setItem(
                res.data.user.type,
                JSON.stringify({
                    id: res.data.user.id,
                    name: res.data.user.name,
                    username: res.data.user.username,
                    type: res.data.user.type,
                    key: res.data.token,
                })
            );
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-screen w-screen bg-slate-100 flex justify-center items-center p-4">
            <div className="bg-white p-5 rounded-3xl w-full max-w-96 shadow-2xl">
                <h1 className="text-xl font-bold text-center">POS Kasir</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <Input
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            id={"username"}
                            label={"Username"}
                            type={"text"}
                        />
                    </div>
                    <div className="mt-5">
                        <Input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            id={"password"}
                            label={"Password"}
                            type={"password"}
                        />
                    </div>
                    <div className="mt-5">
                        <MyButton title={"Login"} />
                    </div>
                </form>
            </div>
        </div>
    );
}
