import React, { useRef } from "react";

const InfoCardSlider = () => {
  const scrollRef = useRef(null);

  const cards = [
    {
      category: "Scopes 1, 2, and 3 Explained",
      date: "June 13, 2025",
      title: "Understanding Emission Categories",
      description:
        "This video provides a clear explanation of the different types of emissions, classified into Scopes 1, 2, and 3, essential for setting climate action goals.",
      buttonText: "Watch Video",
      buttonType: "video",
    },
    {
      category: "Science-Based Target Setting",
      date: "June 13, 2025",
      title: "A Comprehensive Guide",
      description:
        "Body Text: An in-depth walkthrough of the science-based targets initiative’s tool, demonstrating how companies can model Scope 1, 2, and 3 emissions reduction targets.",
      buttonText: "Read Blog",
      buttonType: "blog",
    },
    {
      category: "Net-Zero Goals",
      date: "June 13, 2025",
      title: "Setting Corporate Net-Zero Goals",
      description:
        "This session explores the net-zero standard, offering insights into setting science-based net-zero targets and tackling Scope 3 emissions in supply chains.",
      buttonText: "Watch Video",
      buttonType: "video",
    },
    {
      category: "Sector-Specific Net-Zero Strategies",
      date: "June 13, 2025",
      title: "Tailored Approaches for Industries",
      description:
        "Explore how different sectors, such as agriculture and manufacturing, can set effective net-zero emission targets by analyzing their unique emission profiles.",
      buttonText: "Read Blog",
      buttonType: "blog",
    },
    {
      category: "Decarbonization in Practice",
      date: "June 13, 2025",
      title: "Corporate Journey to Net-Zero",
      description:
        "Discover how leading companies implement effective net-zero strategies to reduce emissions and achieve electrification.",
      buttonText: "Read More",
      buttonType: "blog",
    },
  ];

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto py-8">
      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#50B69A] text-white p-2 rounded-full shadow-md hover:bg-[#3f8f77] transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Card Slider */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="min-w-[300px] rounded-lg p-4 bg-white shadow-xl flex flex-col justify-between"
              >
                <div>
                  <span className="py-[7px] px-[20px] font-bold rounded-[6px] border-2 border-gray-300 inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                    {card.category}
                  </span>
                  <div className="text-sm text-gray-500 mb-2 mt-4">
                    {card.date}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-gray-700 mb-4">{card.description}</p>
                </div>
                <div className="flex justify-end items-end">
                  <button
                    className="bg-[#50B69A] text-white px-4 py-2 rounded"
                    onClick={() => {}}
                  >
                    {card.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#50B69A] text-white p-2 rounded-full shadow-md hover:bg-[#3f8f77] transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default InfoCardSlider;
