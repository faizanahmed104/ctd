"use client"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

import { useRouter } from 'next/navigation';
function ResetPassword() {
    const [otp, setOtp] = useState(['', '', '', '']); // Store OTP values in an array

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Update OTP at the current index
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // If the current field is filled, focus the next field
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // If backspace is pressed, focus the previous field
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    };

    const router = useRouter();

    return (
        <div className='h-full w-full px-28 py-9 flex flex-col'>
            <span className='text-center self-center font-manrope mt-8 mb-[10px] text-[32px] font-bold text-[#FAFAFA]'>
                Password Reset
            </span>
            <span className='text-center self-center font-manrope mb-[61px] text-[14px] font-regular text-[#FAFAFA]'>
                We sent a code to your email
            </span>

            <div className='mb-16 flex flex-row items-start justify-start'>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-input-${index}`}
                        type='text'
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className='border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-[50px] h-[50px] mr-[20px]'
                        placeholder='-'
                    />
                ))}
            </div>
            <div className='flex items-center justify-center mb-10'>
                <button
                    className='w-[158px] h-[50px] text-center rounded-[100px] font-medium text-white bg-[#50B69A]'
                    onClick={() => router.push('/')}
                >
                    Continue
                </button>
            </div>
            <span className='text-center self-center font-manrope text-[#EAEAEA] text-sm mb-[61px] flex flex-row items-center justify-center'>
                Didn't receive the email?{' '}
                <span
                    className='font-medium underline ml-2'
                    onClick={() => {
                        alert(
                            'Please check your email\nNew code has been sent to your email address'
                        );
                    }}
                >
                    Click to resendt
                </span>
            </span>
            <span
                className='text-center self-center font-manrope text-[#EAEAEA] text-sm mb-[304px] flex flex-row items-center justify-center'
                onClick={() => router.push('/')}
            >
                <IoArrowBackSharp className='mr-2 text-white text-2xl' /> Back
                to log in
            </span>
        </div>
    );
}

export default ResetPassword;
