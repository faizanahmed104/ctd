"use client"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

import { useRouter } from 'next/navigation';
function ForgotPassword() {
    // const [userInfo,setUserInfo]= useState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        <div className='h-full w-full px-40 py-9 flex flex-col'>
            <span className='text-center self-center font-manrope mt-8 mb-[10px] text-[32px] font-bold text-[#FAFAFA]'>
                Forgot Password
            </span>
            <span className='text-center self-center font-manrope mb-[61px] text-[14px] font-regular text-[#FAFAFA]'>
                No worries, we’ll send you reset instructions
            </span>

            <div className='mb-16 flex flex-col items-start justify-start'>
                <label className='text-[#FAFAFA] font-manrope text-sm font-regular mb-2'>
                    EMAIL
                </label>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-white bg-transparent border-2 rounded-[10px] p-4 text-white text-sm font-manrope font-normal flex w-[488px]'
                    placeholder='write email here...'
                />
            </div>
            <div className='flex items-center justify-center mb-10'>
                <button
                    className='w-[158px] h-[50px] text-center rounded-[100px] font-medium text-white bg-[#50B69A]'
                    onClick={() => router.push('/reset-password')}
                >
                    Reset Password
                </button>
            </div>
            <span className='text-center self-center font-manrope text-[#EAEAEA] text-sm mb-[304px] flex flex-row items-center justify-center' onClick={() => router.push('/')}>
                <IoArrowBackSharp className='mr-2 text-white text-2xl' /> Back to log in
            </span>
        </div>
    );
}

export default ForgotPassword;
