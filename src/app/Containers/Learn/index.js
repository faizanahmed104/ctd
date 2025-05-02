"use client"
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import HorizontalCard from './HorizontalCard';
import VerticalCard from './VerticalCard';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css'; // Import Swiper's styles
function Learn() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of cards to display at a time
  const cardsToShow = 3;

  // Handle the swipe left
  const swipeLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? horizontalCardData.length - cardsToShow : prevIndex - cardsToShow
    );
  };

  // Handle the swipe right
  const swipeRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsToShow >= horizontalCardData.length
        ? 0
        : prevIndex + cardsToShow
    );
  }
  const horizontalCardData = [
    {
      id: 1,
      img: '/Track_  Intro to Corporate Sustainability.png',
      title: 'Intro to Corporate Sustainability',
      subTitle: 'Learn the basics of corporate sustainability, its principles, and how it supports long-term business resilience.',
      noOfCourse: 5,
    },
    {
      id: 2,
      img: '/Track_ Sustainable Finance Data Management.png',
      title: 'Sustainable Finance Data Management',
      subTitle: 'Learn to integrate carbon accounting into financial reporting for accurate and transparent disclosures.',
      noOfCourse: 5,
    },
    {
      id: 3,
      img: '/Track_ Sustainable Logistics for Manufacturing.png',
      title: 'Sustainable Logistics for Manufacturing',
      subTitle: 'Explore technologies and strategies for greener logistics, from electric fleets to route optimization.',
      noOfCourse: 5,
    },
    // {
    //     id: 4,
    //     img: '/tsg.png',
    //     title: 'ESG Leadership for Managers',
    //     subTitle:'Learn how to embed ESG principles into strategic planning and organizational decision-making.',
    //     noOfCourse: 5,
    // },
    // {
    //     id: 4,
    //     img: '/ml-img.png',
    //     title: 'Become a machine Learning Developer',
    //     noOfCourse: 5,
    // },
    // {
    //     id: 5,
    //     img: '/ml-img.png',
    //     title: 'Become a machine Learning Developer',
    //     noOfCourse: 5,
    // },
    // {
    //     id: 6,
    //     img: '/ml-img.png',
    //     title: 'Become a machine Learning Developer',
    //     noOfCourse: 5,
    // },
    // {
    //     id: 7,
    //     img: '/ml-img.png',
    //     title: 'Become a machine Learning Developer',
    //     noOfCourse: 5,
    // },
    // {
    //     id: 8,
    //     img: '/ml-img.png',
    //     title: 'Become a machine Learning Developer',
    //     noOfCourse: 5,
    // },
  ];
  const verticalCardData = [
    {
      id: 1,
      img: '/Lifecycle Assessment for Product Sustainability.png',
      title: 'Lifecycle Assessment for Product Sustainability',
      noOfLessons: 5,
      previewLink: "link for preview"
    },
    {
      id: 2,
      img: '/Carbon Offsetting and Neutrality Strategies.png',
      title: 'Carbon Offsetting and Neutrality Strategies',
      noOfLessons: 6,
      previewLink: "link for preview"
    },
    {
      id: 3,
      img: '/Data Analytics for Emissions Tracking.png',
      title: 'Data Analytics for Emissions Tracking',
      noOfLessons: 4,
      previewLink: "link for preview"
    },
    {
      id: 4,
      img: '/Sustainability in Procurement Practices.png',
      title: 'Sustainability in Procurement Practices',
      noOfLessons: 8,
      previewLink: "link for preview"
    },
    {
      id: 5,
      img: '/Renewable Energy Solutions for Corporates.png',
      title: 'Renewable Energy Solutions for Corporates',
      noOfLessons: 7,
      previewLink: "link for preview"
    },
    {
      id: 6,
      img: '/Sustainability Certifications Explained.png',
      title: 'Sustainability Certifications Explained',
      noOfLessons: 5,
      previewLink: "link for preview"
    },
    {
      id: 7,
      img: '/Material Efficiency and Resource Optimization.png',
      title: 'Material Efficiency and Resource Optimization',
      noOfLessons: 6,
      previewLink: "link for preview"
    },
    {
      id: 8,
      img: '/Net-Zero Transition Planning.png',
      title: 'Net-Zero Transition Planning',
      noOfLessons: 6,
      previewLink: "link for preview"
    },
    {
      id: 9,
      img: '/Emission Reduction in Real Estate Portfolios.png',
      title: 'Emission Reduction in Real Estate Portfolios',
      noOfLessons: 7,
      previewLink: "link for preview"
    },
    {
      id: 10,
      img: '/Adaptation vs. Mitigation in Corporate Strategy.png',
      title: 'Adaptation vs. Mitigation in Corporate Strategy',
      noOfLessons: 4,
      previewLink: "link for preview"
    },
    {
      id: 11,
      img: '/Water-Energy Nexus in Corporate Sustainability.png',
      title: 'Water-Energy Nexus in Corporate Sustainability',
      noOfLessons: 5,
      previewLink: "link for preview"
    },
    {
      id: 12,
      img: '/The Role of AI in Sustainability Solutions.png',
      title: 'The Role of AI in Sustainability Solutions',
      noOfLessons: 2,
      previewLink: "link for preview"
    }
  ]

  return (
    <div className='px-8'>
      <div className='flex flex-row items-center'>
        <div className='relative w-[630px]'>
          <input
            type='text'
            placeholder='Search products...'
            className='w-full pl-[20px] pr-[50px] py-[10px] border border-gray-300 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <IoSearchOutline className='absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl' />
        </div>
        <button
          className='bg-[#50B69A] w-[120px] h-8 text-center text-white font-poppins font-semibold text-xs rounded-[100px] ml-[34px] mr-[24px]'
          style={{ boxShadow: '0px 10px 30px #00000033' }}
        >
          Basic
        </button>
        <span className='text-[#08120F] text-xs font-semibold font-poppins text-center'>
          Premium
        </span>
      </div>

      <div className='mt-[60px]'>
        <h2 className='font-poppins text-[32px] font-medium mb-14 mt-0 flex items-center'>
          <img
            src='/lesson1.png'
            alt='Learn Icon'
            className='w-6 h-6 object-contain mr-2'
          />
          Learning Tracks
        </h2>
        {/* <HorizontalCarousel horizontalCardData={horizontalCardData}/> */}
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 '>
          {horizontalCardData?.map((item) => (
            <HorizontalCard
              key={item?.id}
              title={item?.title}
              subTitle={item?.subTitle}
              noOfCourses={item?.noOfCourse}
              id={item?.id}
              img={item?.img}
            />
          ))}
        </div>
      </div>
      <div className='mt-[60px]'>
        <h2 className='font-poppins text-[32px] font-medium mb-14 mt-0 flex items-center'>
          <img
            src='/resrvtn.png'
            alt='Learn Icon'
            className='w-6 h-6 object-contain mr-2'
          />
          Courses
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
          {verticalCardData?.map((item) => (
            <VerticalCard
              key={item?.id}
              title={item?.title}
              noOfLessons={item?.noOfLessons}
              id={item?.id}
              img={item?.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learn;

const HorizontalCarousel = ({ horizontalCardData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of cards to display at a time
  const cardsToShow = 3;

  // Handle the swipe left
  const swipeLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? horizontalCardData.length - cardsToShow : prevIndex - cardsToShow
    );
  };

  // Handle the swipe right
  const swipeRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsToShow >= horizontalCardData.length
        ? 0
        : prevIndex + cardsToShow
    );
  };

  return (
    <div className="carousel-container relative">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)` }}
        >
          {horizontalCardData?.map((item) => (
            <div className="w-full sm:w-1/2 lg:w-1/3 px-3" key={item?.id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src={item?.img} alt={item?.title} className="w-full h-40 object-cover rounded-md" />
                <h3 className="mt-4 text-xl font-semibold">{item?.title}</h3>
                <p>{item?.noOfCourse} Courses</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left and Right buttons */}
      <div className='bg-white h-48 w-[90px] flex items-center justify-center'>
        <button
          onClick={swipeLeft}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
        >
          &#60;
        </button>
      </div>
      <button
        onClick={swipeRight}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        &#62;
      </button>
    </div>
  );
};

