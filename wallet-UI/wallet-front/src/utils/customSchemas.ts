import z from "./setZodCustomMessages";
import {
  invalidNationalCodeMessage,
  invalidPhoneNumberMessage,
  onlyNumberMessage,
  persianCharacterMessage,
  requiredMessage,
  invalidLengthMessage,
  invalidEmailMessage,
} from "./validationCustomMessages";

const isPersian = (value: string) => /^[\u0600-\u06FF\s]+$/.test(value);

function checknationalId(code: string): boolean {
  const L = code.length;

  if (L < 8 || parseInt(code, 10) === 0) return false;

  code = ("0000" + code).substr(L + 4 - 10);

  if (parseInt(code.substr(3, 6), 10) === 0) return false;

  const c = parseInt(code.substr(9, 1), 10);
  let s = 0;

  for (let i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);

  s = s % 11;

  return (s < 2 && c === s) || (s >= 2 && c === 11 - s);
}

export const idCardFieldSchema = z.unknown().refine(
  (value) => {
    if (typeof value === "string") {
      return value.trim() !== "";
    } else if (typeof value === "object" && value instanceof File) {
      return value.size > 0 && value.size <= 5 * 1024 * 1024;
    }
    return false;
  },
  {
    message: "Invalid id_card value",
  }
);

export const nationalCodeSchema = z
  .string()
  .refine((value) => !isNaN(Number(value)), {
    message: onlyNumberMessage,
  })

  .refine((value) => checknationalId(value), {
    message: "کد ملی معتیر نمیباشد.",
  })
  .refine((value) => value.length === 10, {
    message: invalidNationalCodeMessage,
  });

export const notEmptyAndPersianField = z
  .string()

  .refine((value) => isPersian(value), {
    message: persianCharacterMessage,
  });
export const bankNumberSchema = z
  .string()
  .refine((value) => value.trim() !== "", {
    message: requiredMessage,
  })
  .refine((value) => !isNaN(Number(value)), {
    message: onlyNumberMessage,
  })
  .refine((value) => value.length <= 18, {
    message: invalidLengthMessage,
  });

export const IBANSchema = z.string().refine(
  (value) => {
    return value.length === 24;
  },
  {
    message: `شماره شبا 24 رقم می‌باشد.`,
  }
);
export const notEmptyField = z.string().refine((value) => value !== "", {
  message: requiredMessage,
});

export const notEmptyDate = z
  .string()
  .refine((value) => !!Date.parse(value), {
    message: "Invalid date format",
  })
  .transform((value) => new Date(value))
  .refine((value) => !!value, {
    message: requiredMessage,
  });

export const emailSchema = z
  .string()
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: invalidEmailMessage,
  })
  .refine((value) => !!value, {
    message: requiredMessage,
  });

export const mobileNumberSchema = z
  .string()
  .refine((value) => value !== "", {
    message: requiredMessage,
  })
  .refine((value) => !isNaN(Number(value)), {
    message: onlyNumberMessage,
  })

  .refine((value) => value[0] === "0", {
    message: invalidPhoneNumberMessage,
  })
  .refine((value) => value.length === 11, {
    message: invalidPhoneNumberMessage,
  });
