import { Controller, useForm, SubmitHandler } from "react-hook-form";
import ButtonComponent from "./elements/ButtonComponent";
import Lottie from "react-lottie";
import animationData from "../jsons/addWallet.json";
import RadioCheckbox from "./elements/RadioCheckbox";
import InputComponent from "./elements/InputComponent";
import UserIcon, { CalenderIcon, IdCardIcon, PhonenumberIcon } from "./Icons";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import DropDownComponent from "./elements/DropDownElement";
import {
  notEmptyField,
  nationalCodeSchema,
  mobileNumberSchema,
  notEmptyAndPersianField,
  notEmptyDate,
  emailSchema,
} from "../utils/customSchemas";
import customZ from "../utils/setZodCustomMessages";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPrivate } from "../api/axios";
import { WALLET_USER_INFO_CREATE } from "../api/apiClient";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export interface IFormData {
  gender: string;
  phonenumber: number;
  birth_date: Date | null;
  first_name: string;
  last_name: string;
  national_id: string;
  email: string;
  password: number;
}

const stepSchema = customZ.object({
  gender: notEmptyField,
  phonenumber: mobileNumberSchema,
  birth_date: notEmptyDate,
  first_name: notEmptyAndPersianField,
  last_name: notEmptyAndPersianField,
  national_id: nationalCodeSchema,
  email: emailSchema,
  password: notEmptyField,
});

function AddUser() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: (data, context, options) => {
      return zodResolver(stepSchema)(data, context, options);
    },
  });

  const [sarbazi, setSarbazi] = useState("");
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };

  const genderOptions = [
    { label: "مرد", value: "m" },
    { label: "زن", value: "f" },
  ];

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    console.log(data);
    const customer = {
      nameUser: data.first_name,
      familyUser: data.last_name,
      birthdayDate: data.birth_date,
      genderUser: data.gender,
      email: data.email,
      phoneNumber: Number(data.phonenumber),
      national_id: Number(data.national_id),
      sarbazi: sarbazi,
      password: data.password,
    };

    try {
      const response = await axiosPrivate.post(
        WALLET_USER_INFO_CREATE,
        customer,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        console.log("User added successfully:", response.data);
        navigate("/add-account");
      } else {
        console.error(
          "ERROR in store_info create:",
          response.data || response.statusText
        );
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const onMilitaryStatusChange = (value: string) => {
    setSarbazi(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12">
      <div className="flex flex-col items-center justify-center gap-12 border w-[300px] md:w-[800px] rounded-md shadow-md my-4 p-6">
        <div className="h-[100px] flex items-center justify-center mx-auto z-10">
          <Lottie options={defaultOptions} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputComponent
            size="regular"
            isRequired
            label="نام"
            name="first_name"
            control={control}
            errors={errors?.first_name}
            svgIcon={<UserIcon />}
          />

          <InputComponent
            size="regular"
            isRequired
            label="نام خانوادگی"
            name="last_name"
            control={control}
            errors={errors?.last_name}
            svgIcon={<UserIcon />}
          />

          <>
            <Controller
              control={control}
              name="birth_date"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <LocalizationProvider
                    dateAdapter={AdapterDateFnsJalali}
                    dateFormats={{ monthShort: "MMMM" }}
                    localeText={{
                      fieldMonthPlaceholder: () => "ماه",
                      fieldDayPlaceholder: () => "روز",
                      fieldYearPlaceholder: () => "سال",
                    }}
                  >
                    <div className="flex flex-col gap-0 mt-1 mb-4">
                      <div className="flex">
                        <label className=" text-gray-900 text-Body-OneLine/14/Regular">
                          تاریخ تولد
                        </label>
                        {<span className="text-red-500">*</span>}
                      </div>

                      <DatePicker
                        // inputFormat="dd.MM.yyyy"

                        slots={{
                          openPickerIcon: CalenderIcon,
                        }}
                        disableFuture
                        value={field.value ? new Date(field.value) : null} // تبدیل رشته به تاریخ
                        onChange={(date) => {
                          field.onChange(
                            date ? date.toISOString().split("T")[0] : null
                          ); // تبدیل به رشته
                          console.log(date?.toISOString().split("T")[0]);
                        }}
                        // onChange={(date) => {
                        //   field.onChange(date);
                        // }}
                        closeOnSelect={true}
                        slotProps={{
                          inputAdornment: {
                            position: "start",
                          },
                          // textField: {
                          //   inputProps: {
                          //     placeholder: "تاریخ تولد",
                          //   },
                          // },
                        }}
                        sx={{
                          svg: {
                            color: errors?.birth_date ? "#B91C1C" : "",
                          },
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            height: "44px",
                            border: "none",
                            borderRadius: "0.5rem",
                          },
                          "& .MuiDialogActions-root": {
                            bgcolor: "#F9FAFB !important",
                          },
                          "& .MuiInputBase-root.Mui-focused": {
                            bgcolor: "#F9FAFB !important",
                          },
                          "& .MuiInputBase-root": {
                            bgcolor: errors?.birth_date
                              ? "#FEE2E2"
                              : "#F9FAFB !important",
                          },
                          "& MuiInputBase-root-MuiOutlinedInput-root": {
                            bgcolor: "red",
                          },
                        }}
                        className={`mb-0 ${
                          errors?.birth_date ? "border-date-error " : ""
                        } `}
                        views={["year", "month", "day"]}
                        openTo="year"
                        // disabled={identityInfo?.birth_date ? true : false}
                      />
                      {errors?.birth_date ? (
                        <p
                          className={`text-Body-OneLine/14/Regular text-red-600`}
                        >
                          وارد کردن این مقدار الزامی است
                        </p>
                      ) : (
                        <div
                          className={`"flex items-center justify-center text-Body-OneLine/14/Regular text-gray-500"`}
                        ></div>
                      )}
                    </div>
                  </LocalizationProvider>
                );
              }}
            />
          </>
          <InputComponent
            size="regular"
            isRequired
            label="کد ملی"
            type="tel"
            name="national_id"
            control={control}
            errors={errors?.national_id}
            maxLength={10}
            svgIcon={<IdCardIcon />}
          />
          <InputComponent
            size="regular"
            isRequired
            label="شماره موبایل"
            type="tel"
            maxLength={11}
            name="phonenumber"
            control={control}
            errors={errors?.phonenumber}
            svgIcon={<PhonenumberIcon />}
          />
          <InputComponent
            size="regular"
            isRequired
            label=" ایمیل"
            name="email"
            control={control}
            errors={errors?.email}
            svgIcon={<UserIcon />}
          />

          <InputComponent
            size="regular"
            isRequired
            label=" رمز ورود"
            name="password"
            control={control}
            errors={errors?.password}
            // svgIcon={<UserIcon />}
            type="tel"
            maxLength={8}
          />

          <RadioCheckbox
            editable={true}
            label="جنسیت"
            name="gender"
            isRequired
            options={genderOptions}
            control={control}
            errors={errors?.gender}
          />
          <DropDownComponent onChange={onMilitaryStatusChange} />
          <ButtonComponent type="submit">ثبت</ButtonComponent>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
