import React from 'react'

function HorizontalCard({ id, img, title, subTitle = '', noOfCourses }) {
  return (
    <div className='w-[430px] h-[180px] rounded-[14px] flex flex-row mb-2' style={{
      boxShadow: '0px 10px 20px #00000033'
    }}>
      <img src={img} alt={title} className='w-[140px] h-[180px] object-cover' style={{ borderTopLeftRadius: 14, borderBottomLeftRadius: 14 }} />
      <div className='px-4 py-[10px] flex-col flex justify-between'>
        <span className='font-poppins text-base text-black text-left'>{title}</span>
        <span className='font-poppins text-xs text-black text-left'>{subTitle}</span>
        <div>
          <hr className="mb-[10px]" style={{
            border: "none",
            borderTop: "1px solid #dedede"
          }} />
          <div className='flex flex-row items-center'>
            <img src="/course-icon.png" className='w-4 h-4 object-contain' /><span className='text-[#BFBFBF] text-base font-poppins ml-1'>{noOfCourses} Courses</span>
          </div></div>
      </div>
    </div>
  )
}

export default HorizontalCard