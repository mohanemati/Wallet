import React, { useEffect, useRef } from "react";
import Lottie from "react-lottie";
import animationData from "../../../src/jsons/ddddot.json";
import { motion, useAnimation } from "framer-motion";

interface ButtonProps {
  primaryColorNumber?: number;
  hasIcon?: boolean;
  icon?: React.ReactNode;
  paddingX?: number;
  variant?: "filled" | "outlined" | "text" | "elevated" | "tonal";
  disabled?: boolean;
  onClick?: (arg: any) => void;
  children: React.ReactNode;
  className?: string;
  title?: any;
  type?: "button" | "submit" | "reset" | undefined;
  isClicked?: any;
  href?: any;
  colorNumber?: number;
  textColor?: string;
  colorNumberBorder?: number;
  textColorBorder?: string;
  bgColor?: string;
  borderColor?: string;
  custome?: any;
  enableEnterKey?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  primaryColorNumber = 800,
  hasIcon = false,
  type = "button",
  icon,
  variant = "filled",
  paddingX = hasIcon
    ? variant === "text"
      ? "pr-3 pl-4"
      : "pr-4 pl-6"
    : "sm:px-6 px-2",
  disabled = false,
  onClick,
  children,
  className = "",
  title = "",
  isClicked = false,
  href,
  colorNumber = 800,
  textColor,
  colorNumberBorder,
  textColorBorder,
  bgColor,
  borderColor,
  custome,
  enableEnterKey = false,
}) => {
  let styles = "";

  function replaceBgColor(currentBgColor?: string): string {
    if (currentBgColor === undefined) {
      return "bg-primary-100";
    }

    return currentBgColor.replace(/(\w+-)\d+00/, "$1100");
  }

  const hovered = (bgColor: string) => {
    const colorPart = bgColor.split("-").slice(0, -1).join("-");
    return `hover:${colorPart}-100 hover:bg-opacity-50`;
  };

  const baseStylesForOutlined = `border ${paddingX} 
  ${textColor ? `${textColor}` : `text-primary-800`}
   ${
     borderColor && !isClicked
       ? ` ${borderColor} `
       : borderColor && isClicked
       ? ` ${borderColor} border-opacity-20`
       : "border-primary-800"
   } 
  ${bgColor ? `${hovered(bgColor)}` : "hover:bg-primary-100"}
  ${disabled && !isClicked ? "opacity-35" : ""}
   transition-transform transform hover:shadow-button_sm_hover whitespace-nowrap sm:h-[40px] h-[30px] sm:text-Body-OneLine/14/Medium text-chequeText flex items-center justify-center text-center py-[10px] sm:rounded-lg rounded-md focus:outline-none`;

  const baseStylesForFilled = `${paddingX} ${
    textColor ? `${textColor}` : `text-white`
  } 
  ${
    isClicked
      ? `${replaceBgColor(bgColor)}`
      : bgColor
      ? bgColor
      : "bg-primary-800"
  }
  ${disabled && !isClicked ? "opacity-35" : ""}
  transition-transform transform hover:shadow-button_sm_hover whitespace-nowrap sm:h-[40px] h-[30px] ${
    custome ? custome : "sm:text-Body-OneLine/14/Medium text-chequeText"
  } flex items-center justify-center text-center py-[10px] sm:rounded-lg rounded-md focus:outline-none`;

  const baseStylesForWlevated = `border ${paddingX} ${
    textColor ? `${textColor}` : `text-gray-900`
  } ${borderColor ? ` ${borderColor}` : "border-primary-600"} ${
    bgColor ? `hover:${bgColor}` : ""
  }
   transition-transform transform hover:shadow-button_sm_hover whitespace-nowrap sm:h-[40px] h-[30px] sm:text-Body-OneLine/14/Medium text-chequeText flex items-center justify-center text-center py-[10px] sm:rounded-lg rounded-md focus:outline-none`;

  const styleWithLessOpacity = ``;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };

  const controls = useAnimation();

  switch (variant) {
    case "filled":
      styles = disabled
        ? `${baseStylesForFilled} cursor-not-allowed`
        : ` ${baseStylesForFilled} hover:opacity-80`;
      break;
    case "outlined":
      styles = disabled
        ? ` ${baseStylesForOutlined} cursor-not-allowed`
        : ` ${baseStylesForOutlined} hover:opacity-80`;
      break;
    case "text":
      styles = disabled
        ? `text-gray-900 ${styleWithLessOpacity} ${paddingX} cursor-not-allowed`
        : `hover:bg-primary-8008 focus:bg-primary-80012 text-primary-${primaryColorNumber} ${baseStylesForFilled} ${paddingX} `;
      break;
    case "elevated":
      styles = disabled
        ? `bg-gray-90012 text-gray-900 ${styleWithLessOpacity} cursor-not-allowed`
        : `bg-primary-50 shadow-button_sm_hover transition-transform transform hover:shadow-button_sm hover:bg-[#D4E0F3] focus:bg-[#D4E0F3] text-primary-${primaryColorNumber} ${baseStylesForWlevated}`;
      break;
    case "tonal":
      styles = disabled
        ? `bg-gray-90012 text-gray-900 ${styleWithLessOpacity} ${paddingX}  cursor-not-allowed`
        : `bg-primary-200 transition-transform transform hover:shadow-button_sm_hover focus:shadow-button_sm_hover text-primary-900 ${baseStylesForFilled} ${paddingX}`;
      break;
    default:
      styles = baseStylesForFilled;
      break;
  }

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!enableEnterKey) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && buttonRef.current && !disabled) {
        buttonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, enableEnterKey]);

  return (
    // <a href={href}>
    <motion.button
      ref={buttonRef}
      type={type}
      className={`${styles} ${className}`}
      onClick={!disabled ? onClick : undefined}
      disabled={isClicked ? true : disabled}
      title={title}
      whileTap={{ scale: 0.95 }}
      animate={controls}
    >
      {hasIcon && icon && <span className="ml-2">{icon}</span>}
      {isClicked ? (
        <div className=" opacity-100 ">
          <Lottie options={defaultOptions} height={50} width={50} />
        </div>
      ) : (
        children
      )}
    </motion.button>
    // </a>
  );
};

export default ButtonComponent;
