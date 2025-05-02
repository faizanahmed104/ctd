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
  getFuelCategories,
  getFuelTypes,
  getFuelUnits,
} from "./constant";
import { style } from "./styles";
import { Input } from "../../../../../../Components/input";
import { Dropdown } from "../../../../../../Components/drop-down";
import { Button } from "../../../../../../Components/button";
import { generateYears } from "../../../../../../../store/helpers";
import { selectAuthState } from "../../../../../../../store/slices/auth";
import {
  saveSubmission,
  selectClientSubmissionState,
  clearSubmissionSuccess,
} from "../../../../../../../store/slices/defra/clientSubmission";

export const AddConsumptionForm = ({ text }) => {
  const [availableFuelTypes, setAvailableFuelTypes] = useState([]);
  const [availableFuelUnits, setAvailableFuelUnits] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "stationary-combustion";
  const { userInfo } = useSelector(selectAuthState);
  const {
    requests: { postSubmission },
  } = useSelector(selectClientSubmissionState);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedFuelCategory = watch("fuelCategory");
  const selectedFuelType = watch("fuelType");

  useEffect(() => {
    if (selectedFuelCategory) {
      const categoryLabel = getFuelCategories().find(
        (cat) => cat.value === selectedFuelCategory
      )?.label;

      setAvailableFuelTypes(getFuelTypes(categoryLabel));
      setValue("fuelType", "");
      setValue("fuelUnits", "");
    } else {
      setAvailableFuelTypes([]);
    }
  }, [selectedFuelCategory, setValue]);

  useEffect(() => {
    if (selectedFuelCategory && selectedFuelType) {
      const categoryLabel = getFuelCategories().find(
        (cat) => cat.value === selectedFuelCategory
      )?.label;
      const fuelTypeLabel = availableFuelTypes.find(
        (type) => type.value === selectedFuelType
      )?.label;

      setAvailableFuelUnits(getFuelUnits(categoryLabel, fuelTypeLabel));
      setValue("fuelUnits", "");
    } else {
      setAvailableFuelUnits([]);
    }
  }, [selectedFuelCategory, selectedFuelType, availableFuelTypes, setValue]);

  useEffect(() => {
    if (postSubmission.success) {
      toast.success("Data submitted successfully!", {
        position: "top-right",
        duration: 3000,
      });
      const timer = setTimeout(() => {
        dispatch(clearSubmissionSuccess());
        router.push(`/data/defra/${category}`);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (postSubmission.error) {
      const errorMessage = typeof postSubmission.error === 'object' 
        ? postSubmission.error.message || 'Something went wrong'
        : postSubmission.error;
      
      toast.error(errorMessage, {
        position: "top-right",
        duration: 3000,
      });
    }
  }, [
    postSubmission.success,
    postSubmission.error,
    category,
    router,
    dispatch,
  ]);

  const onSubmit = (data) => {
    try {
      const dataToSave = {
        ...data,
        userId: userInfo.id,
      };
      console.log("dd ff", dataToSave);
      dispatch(saveSubmission(dataToSave));
    } catch (error) {
      const errorMessage =
        typeof error === "object"
          ? error.message || "Failed to submit data"
          : String(error);

      toast.error(errorMessage, {
        position: "top-right",
        duration: 3000,
      });
    }
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
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Dropdown
                  name="fuelCategory"
                  control={control}
                  label="Fuel Category"
                  options={getFuelCategories()}
                  errors={errors}
                  required
                  placeholder="Select fuel category"
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
                  disabled={!selectedFuelCategory}
                />
              </div>
              <div>
                <Dropdown
                  name="fuelUnits"
                  control={control}
                  label="Fuel Units"
                  options={availableFuelUnits}
                  errors={errors}
                  required
                  placeholder="Select fuel units"
                  disabled={!selectedFuelType}
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
            <div className="flex items-end">
              <div className="flex justify-end w-full">
                <Button
                  type="submit"
                  loading={postSubmission.inProgress}
                  disabled={postSubmission.inProgress}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
