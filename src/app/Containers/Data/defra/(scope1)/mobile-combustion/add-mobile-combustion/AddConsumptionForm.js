"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Stepper from "@keyvaluesystems/react-stepper";
import { schema } from "./AddConsumptionFormSchema";
import {
  SECTORS,
  MONTHS,
  VEHICLE_CATEGORIES,
  FUEL_UNITS,
  getVehicleTypes,
  getFuelTypes,
} from "./constant";
import { style } from "./styles";
import { Input } from "../../../../../../Components/input";
import { Dropdown } from "../../.././../../../Components/drop-down";
import { Button } from "../../../../../../Components/button";
import { generateYears } from "../../../../../../../store/helpers";
import { selectAuthState } from "../../../../../../../store/slices/auth";
import {
  saveMobileSubmission,
  selectMobileSubmissionState,
  clearMobileSubmissionSuccess,
} from "../../../../../../../store/slices/defra/mobileSubmission";

export const AddConsumptionForm = ({ text }) => {
  const [availableVehicleTypes, setAvailableVehicleTypes] = useState([]);
  const [availableFuelTypes, setAvailableFuelTypes] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "mobile-combustion";
  const { userInfo } = useSelector(selectAuthState);
  const {
    requests: { postMobileSubmission },
  } = useSelector(selectMobileSubmissionState);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedVehicleCategory = watch("vehicleCategory");
  const selectedVehicleType = watch("vehicleType");

  useEffect(() => {
    if (postMobileSubmission.success) {
      toast.success("Data submitted successfully!", {
        position: "top-right",
        duration: 3000,
      });
      const timer = setTimeout(() => {
        dispatch(clearMobileSubmissionSuccess());
        router.push(`/data/defra/${category}`);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (postMobileSubmission.error) {
      // Handle error object with message and debug properties
      const errorMessage = typeof postMobileSubmission.error === 'object' 
        ? postMobileSubmission.error.message || 'Something went wrong'
        : postMobileSubmission.error;
      
      toast.error(errorMessage, {
        position: "top-right",
        duration: 3000,
      });
    }
  }, [
    postMobileSubmission.success,
    postMobileSubmission.error,
    category,
    router,
    dispatch,
  ]);

  // Update vehicle types when category changes
  useEffect(() => {
    if (selectedVehicleCategory) {
      setAvailableVehicleTypes(getVehicleTypes(selectedVehicleCategory));
      setValue("vehicleType", "");
      setValue("fuelType", "");
    } else {
      setAvailableVehicleTypes([]);
    }
  }, [selectedVehicleCategory, setValue]);

  // Update fuel types when vehicle type changes
  useEffect(() => {
    if (selectedVehicleCategory && selectedVehicleType) {
      setAvailableFuelTypes(getFuelTypes(selectedVehicleCategory, selectedVehicleType));
      setValue("fuelType", "");
    } else {
      setAvailableFuelTypes([]);
    }
  }, [selectedVehicleCategory, selectedVehicleType, setValue]);

  const onSubmit = (data) => {
    const dataToSave = {
      ...data,
      userId: userInfo.id,
    };
    console.log("dd 12", dataToSave);
    dispatch(saveMobileSubmission(dataToSave));
  };

  return (
    <div>
      <Stepper
        steps={[
          {
            stepLabel: "Preferred Calculation Method: " + text,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-lg w-full ">
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-4">
              <Input
                name="entity"
                control={control}
                label="What Entity Is This Data Being Recorded For?"
                errors={errors}
                required
                placeholder="Enter entity"
              />
            </div>
            <div className="col-span-4">
              <Dropdown
                name="sector"
                control={control}
                label="What Sector Best Describes Your Company?"
                options={SECTORS}
                errors={errors}
                required
                placeholder="Select sector"
              />
            </div>
            <div className="col-span-2">
              <Dropdown
                name="month"
                control={control}
                label="Month"
                options={MONTHS}
                errors={errors}
                required
                placeholder="Select month"
              />
            </div>
            <div className="col-span-2">
              <Dropdown
                name="year"
                control={control}
                label="Year"
                options={generateYears()}
                errors={errors}
                required
                placeholder="Select year"
              />
            </div>
          </div>
          <div className="grid gap-4 mb-4">
            <div className="grid grid-cols-5 gap-4">
              <div>
                <Dropdown
                  name="vehicleCategory"
                  control={control}
                  label="Vehicle Category"
                  options={VEHICLE_CATEGORIES}
                  errors={errors}
                  required
                  placeholder="Select vehicle category"
                />
              </div>
              <div>
                <Dropdown
                  name="vehicleType"
                  control={control}
                  label="Vehicle Type"
                  options={availableVehicleTypes}
                  errors={errors}
                  required
                  placeholder="Select vehicle type"
                  disabled={!selectedVehicleCategory}
                />
              </div>
              <div>
                <Dropdown
                  name="fuelType"
                  control={control}
                  label="Fuel Type"
                  options={availableFuelTypes}
                  errors={errors}
                  required
                  placeholder="Select fuel type"
                  disabled={!selectedVehicleType}
                />
              </div>
              <div>
                <Dropdown
                  name="fuelUnit"
                  control={control}
                  label="Fuel Units"
                  options={FUEL_UNITS}
                  errors={errors}
                  required
                  placeholder="Select fuel units"
                />
              </div>
              <div>
                <Input
                  name="quantity"
                  control={control}
                  label="Quantity"
                  errors={errors}
                  required
                  placeholder="Enter quantity"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              loading={postMobileSubmission.inProgress}
              disabled={postMobileSubmission.inProgress}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
