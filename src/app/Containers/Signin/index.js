"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../hooks";
import { login } from "../../../store/slices/auth";
import { useAuth } from "../../Context";

function Signin() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Single state for email and password
    const [formData, setFormData] = useState({ email: "", password: "" });

    // Reusable onChange handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const logInRequest = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const result = await dispatch(login({ email, password }));
            console.log(result, "RESULT");

            // Example logic (uncomment as needed)
            if (result?.meta?.requestStatus === 'fulfilled') {
                window.location = '/'
                // router.push("/");
            } else {
                window.alert("Invalid credentials!");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
    };

    return (
        <div className="h-full w-full px-20 py-9 flex flex-col">
            <span className="text-center self-center font-manrope mt-8 mb-[55px] text-[32px] font-bold text-[#FAFAFA]">
                Log In
            </span>
            <form onSubmit={logInRequest}>
                <div className="mb-4 flex flex-col items-start justify-start">
                    <label className="text-[#FAFAFA] font-manrope text-sm font-regular mb-2">
                        NAME/EMAIL
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-[488px]"
                        placeholder="Write name/email here..."
                    />
                </div>
                <div className="mb-4 flex flex-col items-start justify-start">
                    <label className="text-[#FAFAFA] font-manrope text-sm font-regular mb-2">
                        PASSWORD
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-[488px]"
                        placeholder="Write password here..."
                    />
                </div>
                <div className="flex items-end justify-end mb-11 mt-2">
                    <span
                        className="text-[#FAFAFA] font-manrope text-sm font-regular underline cursor-pointer"
                        onClick={() => router.push("/forgot-password")}
                    >
                        Forgot Password
                    </span>
                </div>

                <div className="flex items-center justify-center mb-10">
                    <button
                        className="w-[158px] h-[50px] text-center rounded-[100px] text-white bg-[#50B69A]"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
            <span className="text-center self-center font-manrope text-[#EAEAEA] text-sm mb-[304px]">
                Don’t have an account?
                <span
                    className="text-[#50B69A] ml-2 cursor-pointer"
                    onClick={() => router.push("/signup")}
                >
                    Sign up
                </span>
            </span>
        </div>
    );
}

export default Signin;
