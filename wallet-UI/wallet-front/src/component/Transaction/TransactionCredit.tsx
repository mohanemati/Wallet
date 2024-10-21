import React from "react";
import InputComponent from "../elements/InputComponent";
import { notEmptyField } from "../../../src/utils/customSchemas";
import customZ from "../../../src/utils/setZodCustomMessages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonComponent from "../elements/ButtonComponent";

const stepSchema = customZ.object({
  PriceCredit: notEmptyField,
});

export interface DataPrice {
  PriceCredit: number;
}

function TransactionCredit() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DataPrice>({
    resolver: zodResolver(stepSchema),
  });

  const onSubmit = (data: DataPrice) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-[90%] bg-white border rounded-lg h-[400px] mt-10 flex flex-col shadow-button_sm_hover"
    >
      <div className="w-[90%] m-5">
        <InputComponent
          size="regular"
          isRequired
          label="میزان مبلغ واریز را وارد کنید."
          name="PriceCredit"
          control={control}
          errors={errors?.PriceCredit}
          type="tel"
          maxLength={10}
        />
      </div>
      <div className="absolute bottom-0 left-0 m-5">
        <ButtonComponent className="w-[200px]" type="submit">
          واریز وجه
        </ButtonComponent>
      </div>
    </form>
  );
}

export default TransactionCredit;
