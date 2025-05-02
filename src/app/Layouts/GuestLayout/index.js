import React from 'react';
const GuestLayout = ({ children }) => {
    return (
        <div
            className={'w-full bg-cover bg-center h-auto'}
            style={{
                backgroundImage: "url('/Background.png')",

            }}
        >
            {/* <div>
                <nav className='flex flex-row items-center justify-end pt-12'>
                    <span className='font-manrope text-[32px] cursor-pointer text-[#FAFAFA] mr-14'>Pricing</span>
                    <span className='font-manrope text-[32px] cursor-pointer text-[#FAFAFA] mr-14'>Purchase Plan</span>
                    <span className='cursot-pointer mr-14 cursor-pointer'><img src="/languageicon.png" className='h-12 w-12 object-contain'/></span>
                    <span className='cursot-pointer pr-32 cursor-pointer'><img src="/circle-phone.png" className='h-12 w-12 object-contain'/></span>
                </nav>
            </div> */}
            <div className='flex items-start justify-between pt-28 px-10 lg:px-8 xl:px-8 2xl:px-32'>
                <div className='flex flex-col items-start pt-56 pr-10'>
                    <img src='/Carbontrack.png' className='object-contain' />
                    <span className='text-[#FAFAFA] text-[32px] font-manrope font-bold mt-10'>
                        Measure. Report. Act.
                    </span>
                </div>
                <div className='bg-white/20 h-full backdrop-blur-3xl rounded-[20px] shadow-lg'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default GuestLayout;
