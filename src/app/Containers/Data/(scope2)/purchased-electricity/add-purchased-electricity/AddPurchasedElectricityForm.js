"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Stepper from "@keyvaluesystems/react-stepper";
import { schema } from "./AddPurchasedElectricityFormSchema";
import { MONTHS, SECTORS, SEGMENTS, UNIT_TYPES } from "./constant";
import { style } from "./styles";
import { Input } from "../../../../../Components/input";
import { Dropdown } from "../../../../../Components/drop-down";
import { Button } from "../../../../../Components/button";
import { generateYears } from "../../../../../../store/helpers";
import { selectAuthState } from "../../../../../../store/slices/auth";
import {
  savePurchasedElectricitySubmission,
  selectPurchasedElectricitySubmissionState,
  clearPurchasedElectricitySubmissionSuccess,
} from "../../../../../../store/slices/ipcc/purchasedElectricitySubmissions";

export const AddConsumptionForm = ({ text }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "purchased-electricity";
  const { userInfo } = useSelector(selectAuthState);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    requests: { postPurchasedElectricitySubmission },
  } = useSelector(selectPurchasedElectricitySubmissionState);

  const onSubmit = (data) => {
    const dataToSave = {
      ...data,
      userId: userInfo.id,
    };
    console.log('dd 33',dataToSave);
    dispatch(savePurchasedElectricitySubmission(dataToSave));
  };

  useEffect(() => {
    if (postPurchasedElectricitySubmission.success) {
      toast.success("Data submitted successfully!", {
        position: "top-right",
        duration: 3000,
      });
      const timer = setTimeout(() => {
        dispatch(clearPurchasedElectricitySubmissionSuccess());
        router.push(`/data/ipcc/${category}`);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (postPurchasedElectricitySubmission.error) {
      toast.error(postPurchasedElectricitySubmission.error, {
        position: "top-right",
        duration: 3000,
      });
    }
  }, [
    postPurchasedElectricitySubmission.success,
    postPurchasedElectricitySubmission.error,
    category,
    router,
    dispatch,
  ]);

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
                  name="segment"
                  control={control}
                  label="Segment"
                  options={SEGMENTS}
                  errors={errors}
                  required
                  placeholder="Select Segment"
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
              <div>
                <Dropdown
                  name="unitType"
                  control={control}
                  label="Unit Type"
                  options={UNIT_TYPES}
                  errors={errors}
                  required
                  placeholder="Select fuel units"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              loading={postPurchasedElectricitySubmission.inProgress}
              disabled={postPurchasedElectricitySubmission.inProgress}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
