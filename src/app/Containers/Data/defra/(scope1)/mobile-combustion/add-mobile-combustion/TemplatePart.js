"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@keyvaluesystems/react-stepper";
import { style } from "./styles";
import FileUploadModal from "../../../../../../Components/Common/FileUploadModal";
import { selectAuthState } from "../../../../../../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks";
import { Button } from "../../../../../../Components/button";
import { bulkUploadMobile } from "../../../../../../../store/slices/defra/mobileSubmission";

export const TemplatePart = ({ text }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectAuthState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = async (file) => {
    if (!userInfo?.id) throw new Error("User ID is required");

    const result = await dispatch(
      bulkUploadMobile({
        file,
        userId: userInfo.id,
      })
    ).unwrap();

    if (result) {
      router.push("/data/defra/mobile-combustion");
    }
    return result;
  };

  return (
    <div>
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
            <Button onClick={handleOpenModal} variant="outlined">
              Upload your excel
            </Button>
          </div>
        </div>
      </div>
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileUpload={handleFileUpload}
        title="Upload Excel File"
        acceptedFileTypes=".xlsx,.xls"
        uploadButtonText="Upload File"
        animationDuration={2000}
        maxFileSize={5 * 1024 * 1024} // 5MB limit
      />
    </div>
  );
};
