import { SubmitHandler, useForm } from "react-hook-form";
import ButtonComponent from "./elements/ButtonComponent";
import Lottie from "react-lottie";
import animationData from "../jsons/addWallet.json";
import InputComponent from "./elements/InputComponent";
import { IdCardIcon } from "./Icons";
import {
  notEmptyField,
  bankNumberSchema,
  IBANSchema,
} from "../utils/customSchemas";
import customZ from "../utils/setZodCustomMessages";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPrivate } from "../api/axios";
import { WALLET_CUSTOMER_ACCOUNT_INFO_CREATE } from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export interface IFormData {
  IBAN: number;
  accountBalance: number;
  accountNumber: number;
}

const stepSchema = customZ.object({
  IBAN: IBANSchema,
  accountBalance: notEmptyField,
  accountNumber: bankNumberSchema,
});

function AddAccount() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: (data, context, options) => {
      return zodResolver(stepSchema)(data, context, options);
    },
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    console.log(data);
    const customer = {
      accountNumber: Number(data.accountNumber),
      accountBalance: Number(data.accountBalance),
      createAccountDate: new Date().toISOString(),
      accountIRIB: Number(data.IBAN),
    };

    try {
      const response = await axiosPrivate.post(
        WALLET_CUSTOMER_ACCOUNT_INFO_CREATE,
        customer,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        console.log("User added successfully:", response.data);
        navigate("/");

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

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-center justify-center gap-12 border w-[300px] md:w-[800px] rounded-md shadow-md my-4 p-6 ">
        <div className="h-[100px] flex items-center justify-center mx-auto z-10">
          <Lottie options={defaultOptions} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputComponent
            size="regular"
            isRequired
            label="شماره حساب "
            type="tel"
            name="accountNumber"
            control={control}
            errors={errors?.accountNumber}
            maxLength={14}
            svgIcon={<IdCardIcon />}
          />
          <InputComponent
            size="regular"
            isRequired
            label="موجودی حساب "
            type="tel"
            name="accountBalance"
            control={control}
            errors={errors?.accountBalance}
            maxLength={10}
            svgIcon={<IdCardIcon />}
          />

          <InputComponent
            size="regular"
            isRequired
            label=" شماره شبا"
            name="IBAN"
            control={control}
            errors={errors?.IBAN}
            svgIcon={<IdCardIcon />}
            type="tel"
            maxLength={24}
          />
          <ButtonComponent type="submit">ثبت</ButtonComponent>
        </form>
      </div>
    </div>
  );
}

export default AddAccount;
