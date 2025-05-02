"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { FaPaperclip } from "react-icons/fa6";
import { FaTrash, FaUpload } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Stepper from "@keyvaluesystems/react-stepper";
import { useAuth } from "../../../Context";
import { style } from "./styles";

export const TemplatePart = ({ text }) => {
  const [downloadLoader, setDownloadLoader] = useState(false);
  const [showUploadModal, setUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [fileSuccess, setFileSuccess] = useState(false);
  const { setActiveHeader, setActiveItem } = useAuth();

  const router = useRouter();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        // const formData = new FormData();
        // formData.append('file', selectedFile);
        // // console.log('File selected:', selectedFile.name);
        // const resp = await fetch(apiUrl + endpoints.fileUpload, {
        //     method: 'POST',
        //     body: formData,
        // });
        // if (!resp.ok) {
        //     throw new Error('File upload failed');
        // }

        // const result = await resp.json();
        // console.log('File uploaded successfully:', result);
        setFileSuccess(true);
        setTimeout(() => {
          setFileSuccess(false);
          setUploadModal(false); // Close the modal after submitting
          setSelectedFile(null);
          setActiveHeader(1);
          setActiveItem("Dashboard");
          // setMonthlyEmissions({
          //     heading: 'Monthly Emissions',
          //     subHeading:format(subMonths(new Date(),1),'MMM'),
          //     carbonEmission: '600k',
          //     comparisionText: "+40",
          //     comparisionItem:format(subMonths(new Date(),2),'MMM'),
          //     data: [20,60,10,70],
          //     labels:[]
          // })

          router.push("/");
        }, 5000);
      } catch (error) {
        console.log(error.message);
      } finally {
        setUploadingFile(false);
      }
      // Perform file upload or other actions here
    } else {
      alert("No file selected");
    }
  };
  const handlePreSubmit = () => {
    setUploadingFile(true);
    setTimeout(() => {
      handleSubmit();
    }, 5000);
  };
  const handleDownload = () => {
    setDownloadLoader(true);
    const fileUrl = "/files/Category 1_ Stationary Combustion.xlsx"; // URL of the static file on the server

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Stationary_Combustion_Template.xlsx"; // Specify the download file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadLoader(false);
  };
  const formatFileName = (fileName) => {
    if (fileName.length > 40) {
      return fileName.slice(0, 40) + "..."; // Truncate and add ellipsis if file name is longer than 10 characters
    }
    return fileName;
  };
  const closeModal = () => {
    setSelectedFile(null);
    setUploadModal(false);
  };
  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {fileSuccess ? (
        <div className="bg-white rounded-lg w-96 text-center">
          <div className="flex items-end justify-end mb-0 p-3">
            <span onClick={() => closeModal()}>X</span>
          </div>
          <div className="flex items-center justify-center flex-col pb-12 px-12">
            <h4 className="text-xl">
              Your file has been uploaded and processed successfully
            </h4>
            {/* <span>Taking you to homepage now</span> */}
            <div className="flex justify-center items-center mt-4">
              <AiOutlineCheckCircle size={30} color="#50B69A" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg w-96 text-center">
          <div className="flex items-end justify-end mb-1 p-3">
            <span onClick={() => closeModal()}>X</span>
          </div>
          {uploadingFile ? (
            <div className="flex items-center justify-center flex-col pb-12">
              <h4 className="text-xl">Processing your file please wait!</h4>
              <div className="flex justify-center items-center mt-4">
                <ClipLoader color="#4CAF50" loading={uploadingFile} size={50} />
              </div>
            </div>
          ) : (
            <div className="px-8 py-2 items-center">
              <h2 className="text-2xl mb-8">Upload your data file below</h2>
              <div
                className="flex flex-row items-center justify-center mb-0 w-full p-2 rounded bg-white cursor-pointer text-gray-600"
                style={{}}
              >
                {!selectedFile && (
                  <FaUpload className="mr-2 text-gray-600" size={24} />
                )}
                {selectedFile ? (
                  <span className="flex flex-row items-center border px-2 rounded-sm mr-2">
                    {" "}
                    <FaPaperclip className="mr-2 text-gray-500" size={18} />
                    {formatFileName(selectedFile.name)}
                  </span>
                ) : (
                  <div className="relative items-center">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <input
                      type="text"
                      readOnly
                      value={
                        selectedFile
                          ? formatFileName(selectedFile.name)
                          : "No file selected"
                      }
                      className="pt-0 w-full text-center"
                    />
                  </div>
                )}
                <span
                  className="flex row cursor-pointer"
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                >
                  {selectedFile && (
                    <FaTrash className="text-red-500 mt-3" size={26} />
                  )}
                </span>
              </div>
              <div className="mt-8 mb-4 flex flex-col">
                <button
                  onClick={handlePreSubmit}
                  className="bg-[#50B69A] text-white px-4 py-2 rounded mb-2 hover:bg-green-600"
                >
                  Upload
                </button>
                <button
                  onClick={() => closeModal()}
                  className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {showUploadModal && <Modal />}
      <Stepper
        steps={[
          {
            stepLabel: "Prefered Calculation Method: " + text,
            completed: true,
          },
          {
            stepLabel: "Import and Map your Data",
            completed: false,
          },
        ]}
        currentStepIndex={1}
        styles={style}
      />
      <div className="flex flex-row items-center justify-between ">
        <div className="rounded-lg p-[18px] h-[209px] border-2 border-[#C4C4C4] mr-[25px] flex flex-col justify-between">
          <h5 className="text-xs font-bold font-poppins">Use Our Template</h5>
          <span className="text-sm font-normal font-poppins">
            Easily enter your data onto the Carbon Track platform using our
            verified templates for data upload. Simply read the instructions,
            download the template and add your data points. Should you require
            assistance, please contact your trusted Carbon Track representative.
          </span>
          <div className="flex flex-row items-center justify-between">
            <div className="inline-flex items-center">
              <img
                src="/comment-info.png"
                className="w-6 h-6 object-contain mr-3"
              />
              <span className="text-xs font-bold font-poppins">
                Template Instructions
              </span>
            </div>
            <button
              className="bg-[#50B69A] rounded-md flex items-center justify-center w-[184px] h-[34px]"
              onClick={() => {
                handleDownload();
              }}
            >
              <span className="text-sm font-semibold font-poppins text-white">
                Template Download
              </span>
            </button>
          </div>
        </div>
        <div className="rounded-lg p-[18px] h-[209px] border-2 border-[#C4C4C4] flex flex-col justify-between">
          <h5 className="text-xs font-bold font-poppins">Template Upload</h5>
          <span className="text-sm font-normal font-poppins">
            Upload your data to receive accurate metrics that analyze your
            Stationary Combustion.
          </span>
          <div className="flex items-end justify-end">
            <button
              className="bg-white border border-[#50B69A] rounded-md flex items-center justify-center w-[184px] h-[34px]"
              onClick={() => {
                if (text === "Fuel Consumption Method") setUploadModal(true);
              }}
            >
              <span className="text-sm font-semibold font-poppins text-[#50B69A]">
                Template Upload
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
