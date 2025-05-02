import { useState, useEffect } from "react";

export default function Tabs({ tabs = [], pills = false, loading = false }) {
  // Validate tabs array
  if (!Array.isArray(tabs)) {
    console.warn('Tabs component: "tabs" prop must be an array');
    return null;
  }

  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(null);

  // Initialize content safely
  useEffect(() => {
    if (tabs.length > 0) {
      setContent(tabs[0]?.content || null);
    }
  }, []);

  // Handle tab changes safely
  const handleTabChange = (index) => {
    if (index < 0 || index >= tabs.length) return;

    setActiveTab(index);
    if (loading) {
      setIsLoading(true);
      setContent(null);

      const timer = setTimeout(() => {
        setContent(tabs[index]?.content || null);
        setIsLoading(false);
      }, 500);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timer);
    } else {
      setContent(tabs[index]?.content || null);
    }
  };

  // Update content when tabs prop changes
  useEffect(() => {
    if (tabs.length > 0 && activeTab < tabs.length) {
      setContent(tabs[activeTab]?.content || null);
    } else if (tabs.length === 0) {
      setContent(null);
      setActiveTab(0);
    }
  }, [tabs, activeTab]);

  // Return early if no tabs
  if (tabs.length === 0) {
    return <div className="text-gray-500">No tabs available</div>;
  }

  return (
    <>
      {/* Tab container */}
      <div
        className={
          pills
            ? "inline-flex rounded-md overflow-hidden border border-gray-300"
            : "flex border-b border-gray-200"
        }
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          const pillClasses = isActive
            ? "bg-white text-black font-semibold"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200";
          const defaultClasses = isActive
            ? "border-b-2 border-blue-500 text-blue-600 font-medium"
            : "text-gray-500 hover:text-blue-600";

          return (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`${
                pills
                  ? `px-4 py-2 text-sm transition-colors duration-200 ${pillClasses}`
                  : `py-2 px-4 text-sm transition-colors duration-200 ${defaultClasses}`
              } focus:outline-none`}
            >
              {tab.label || "Unnamed Tab"}
            </button>
          );
        })}
      </div>

      {/* Active tab content with loading state */}
      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          content || <div className="text-gray-500">No content available</div>
        )}
      </div>
    </>
  );
}
