"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Stepper from "@keyvaluesystems/react-stepper";
import { schema } from "./AddConsumptionFormSchema";
import { SECTORS, MONTHS, FUEL_TYPES, FUEL_UNITS } from "./constant";
import { style } from "./styles";
import { Input } from "../../../../../Components/input";
import { Dropdown } from "../../.././../../Components/drop-down";
import { Button } from "../../../../../Components/button";
import { generateYears } from "../../../../../../store/helpers";
import { selectAuthState } from "../../../../../../store/slices/auth";
import {
  saveMobileSubmission,
  selectMobileSubmissionState,
  clearMobileSubmissionSuccess,
} from "../../../../../../store/slices/ipcc/mobileSubmission";

export const AddConsumptionForm = ({ text }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "mobile-combustion";
  const { userInfo } = useSelector(selectAuthState);
  const {
    requests: { postMobileSubmission },
  } = useSelector(selectMobileSubmissionState);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (postMobileSubmission.success) {
      toast.success("Data submitted successfully!", {
        position: "top-right",
        duration: 3000,
      });
      const timer = setTimeout(() => {
        dispatch(clearMobileSubmissionSuccess());
        router.push(`/data/ipcc/${category}`);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (postMobileSubmission.error) {
      toast.error(postMobileSubmission.error, {
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

  const onSubmit = (data) => {
    const dataToSave = {
      ...data,
      userId: userInfo.id,
    };
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
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Dropdown
                  name="fuelType"
                  control={control}
                  label="Fuel & Transportation Type"
                  options={FUEL_TYPES}
                  errors={errors}
                  required
                  placeholder="Select fuel type"
                />
              </div>
              <div>
                <Dropdown
                  name="fuelUnits"
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
