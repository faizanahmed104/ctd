import React from 'react';

function DecarbonizeNow() {
  const data = [
    {
      points: '3/5',
      name: 'Kick-Off Meetings With Carbon Track Team',
      assignedTo: 'Ali',
      stage: 'Initiation',
    },
    {
      points: '2/7',
      name: 'Input Company-Wide Emissions Data ',
      assignedTo: 'Moeen Ahmed',
      stage: 'Data',
    },
    {
      points: '15/21',
      name: 'Initiate & Complete Employee Trainings',
      assignedTo: 'Jawaid',
      stage: 'Learn',
    },
    {
      points: '0/5',
      name: 'Validate Financial Data    ',
      assignedTo: 'Sara',
      stage: 'Actions',
    },
    {
      points: '0/5',
      name: 'Validate Spend-Based Activity Data',
      assignedTo: 'Arbaz',
      stage: 'Actions',
    },
    // {
    //   points: '8/5',
    //   name: 'Team Retrospective and Feedback',
    //   assignedTo: 'Taylor',
    //   stage: 'Evaluation',
    // },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr style={{ backgroundColor: '#bae2d7', borderRadius: '16px 16px 0 0', overflow: 'hidden' }}>
            <th className="text-[22px] font-[600] font-poppins text-[#08120F] px-6 py-4 border-b rounded-tl-2xl">Points</th>
            <th className="text-[22px] font-[600] font-poppins text-[#08120F] px-6 py-4 border-b">Name</th>
            <th className="text-[22px] font-[600] font-poppins text-[#08120F] px-6 py-4 border-b whitespace-nowrap">Assigned To</th>
            <th className="text-[22px] font-[600] font-poppins text-[#08120F] px-6 py-4 border-b">Stage</th>
            <th className="text-[22px] font-[600] font-poppins text-[#08120F] px-6 py-4 border-b rounded-tr-2xl">Detail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#EEF8F5]'}`}
            >
              <td
                className="text-center py-4"

              >
                <span className='text-[19px] font-[600] text-center h-[31px] rounded-[10px] font-poppins px-5' style={{
                  backgroundColor: '#ec424d33',
                  color: '#fb3b3a',

                }}>{item.points}</span>
              </td>
              <td className="py-4 text-center">
                <span className='text-[19px] font-[600] text-center font-poppins text-black'> {item.name}</span>
              </td>
              <td
                className="text-center h-8 py-4"

              >
                <span className='text-[19px] font-[600] font-poppins rounded-2xl px-5' style={{
                  backgroundColor: '#bae2d7',
                  color: '#00401a',
                  //   width:"400px"
                }}>{item.assignedTo}
                </span>
              </td>
              <td className="text-[19px] font-[600] text-center font-poppins py-4 text-black">
                {item.stage}
              </td>
              <td className="text-[19px] font-[600] text-center font-poppins py-4">
                <button className="px-4 py-2 border h-[34px] w-[130px] border-[#50B69A] text-[#50B69A] font-poppins font-[500] text-sm rounded-md hover:bg-[#08120F] hover:text-white transition">
                  Learn More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DecarbonizeNow;
