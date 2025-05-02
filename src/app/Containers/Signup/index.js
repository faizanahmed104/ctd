"use client";
import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { signup } from "../../../store/slices/auth";

import { useRouter } from "next/navigation";
function Signup() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    // Single state for form fields
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        purchaseId: "",
    });

    // Reusable onChange handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const signupRequest = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData
        if (password !== confirmPassword) {
            console.log("Passwords Not Matched")
            return
        }

        try {
            const result = await dispatch(signup(formData));
            console.log(result, "RESULT");

            // Example logic (uncomment as needed)
            // if (result?.meta?.requestStatus === 'fulfilled') {
            //   alert("Signup successful!");
            // } else {
            //   alert("Signup failed. Please try again.");
            // }
        } catch (error) {
            console.error("An error occurred during signup:", error);
        }
    };

    return (
        <form onSubmit={signupRequest}>
            <div className="h-full px-20 py-9">
                <div className="flex flex-row items-center justify-between mb-10 mt-9">
                    <button
                        type="button"
                        className="w-[210px] h-[50px] text-center font-manrope text-white text-[15px] font-semibold rounded-[100px] bg-[#50B69A] mr-[70px]"
                    >
                        Sign up
                    </button>
                    <button
                        type="button"
                        className="w-[210px] h-[50px] text-center font-manrope text-white text-[15px] font-semibold rounded-[100px] bg-[#50B69A]"
                        onClick={() => router.push("/signin")}
                    >
                        Log in
                    </button>
                </div>
                <div className="mb-4 flex flex-col items-start justify-start">
                    <label className="text-[#FAFAFA] font-manrope text-sm font-medium mb-2">
                        NAME
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-full"
                        placeholder="Write name here..."
                    />
                </div>
                <div className="mb-2 flex flex-col items-start justify-start">
                    <label className="text-[#FAFAFA] font-manrope text-sm font-medium mb-2">
                        COMPANY NAME
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-full"
                        placeholder="Write company name here..."
                    />
                </div>
                <div className="mb-4 flex flex-col items-start justify-start">
                    <label className="text-[#FAFAFA] font-manrope text-sm font-medium mb-2 uppercase">
                        EMAIL ADDRESS
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-full"
                        placeholder="Write email here..."
                    />
                </div>
                <div className="mb-4 flex flex-col items-start justify-start">
                    <label className="text-[#FAFAFA] font-manrope text-sm font-medium mb-2">
                        PASSWORD
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-full"
                        placeholder="Write password here..."
                    />
                </div>
                <div className="mb-4 flex flex-col items-start justify-start">
                    <label className="text-[#FAFAFA] font-manrope text-sm font-medium mb-2">
                        REPEAT PASSWORD
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-full"
                        placeholder="Write confirm password here..."
                    />
                </div>
                <div className="mb-4 flex flex-col items-start justify-start">
                    <label className="text-[#FAFAFA] font-manrope text-sm font-medium mb-2">
                        PURCHASE ID NUMBER
                    </label>
                    <input
                        type="text"
                        name="purchaseId"
                        value={formData.purchaseId}
                        onChange={handleChange}
                        className="border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-full"
                        placeholder="Write number here..."
                    />
                </div>
                <div className="flex items-center justify-center mt-6 mb-9">
                    <button
                        type="submit"
                        className="w-[158px] h-[50px] text-center rounded-[100px] text-white bg-[#50B69A]"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Signup;
