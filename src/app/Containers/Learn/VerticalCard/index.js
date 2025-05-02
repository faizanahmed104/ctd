import React from 'react'

function VerticalCard({ img, title, noOfLessons, previewLink }) {
  return (
    <div className='flex flex-col items-center w-[280px] h-[364px] rounded-2xl bg-white' style={{
      borderBottom: '1px solid #50B69A', boxShadow: '0px 10px 20px #00000033'
    }}>
      <img src={img} alt={title} className='w-[280px] h-[180px] object-cover mb-5' style={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }} />
      <div className='flex flex-col items-center justify-between'>
        <span className='text-black text-center font-poppins text-base mb-[14px] font-semibold'>{title}</span>
        <div>
          <h5 className='text-sm font-poppins font-normal text-[#50B69A] mb-[22px] flex flex-row'><img src="/catalog-magazine.png" className='w-4 h-4 object-contain mr-2' />{noOfLessons} Lessons</h5>
          <button onClick={() => { console.log(previewLink) }} className='h-8 w-32 rounded-[100px] text-center font-poppins font-semibold text-xs text-[#08120F]'
            style={{
              border: '1px solid #50B69A'
            }}
          >Preview</button>
        </div></div>
    </div>
  )
}

export default VerticalCard