"use client";

import React from "react";

import { useTheme } from "next-themes";
import { Toaster as ToasterPrimitive, type ToasterProps } from "sonner";
import { twJoin } from "tailwind-merge";

import { buttonVariants } from "@v1/ui/button";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

import { Check, Info, Loader, TriangleAlert } from "lucide-react";

const Toast = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  return (
    <ToasterPrimitive
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        info: <MdOutlineError size={16} />,
        success: <Check size={16} />,
        warning: <FaExclamationTriangle size={14} />,
        error: <FaExclamationTriangle size={14} />,
        loading: <Loader size={16} className="animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        closeButton: true,
        classNames: {
          toast: twJoin(
            "bg-background ring-1 ring-border dark:ring-inset sm:min-w-[22rem] rounded-xl text-foreground overflow-hidden text-[0.925rem] backdrop-blur-xl px-4 py-3 font-normal sm:px-4 sm:py-3",
            "[&:has([data-icon])_[data-content]]:ml-5",
            '[&:has([data-button])_[data-close-button="true"]]:hidden',
            "[&:not([data-description])_[data-title]]:font-normal",
            "[&:has([data-description])_[data-title]]:!font-medium [&:has([data-description])_[data-title]]:!text-lg",
            "[&>[data-button]]:absolute [&>[data-button=true]]:bottom-4",
            "[&>[data-action=true]]:right-4",
            "[&>[data-cancel=true]]:left-4",
          ),
          icon: "absolute top-[1rem] ",
          content:
            "[&:not(:has(+button))]:pr-10 [&:has(+button)]:pb-11 md:[&:has(+button)]:pb-9",
          error:
            "bg-destructive/75 ring-destructive text-white ring-inset shadow-md shadow-destructive/50 [&>[data-close-button=true]>svg]:text-white [&>[data-close-button=true]:hover]:bg-transparent",
          info: "bg-blue/80 !ring-blue text-white ring-inset shadow-md shadow-blue [&>[data-close-button=true]>svg]:text-white [&>[data-close-button=true]:hover]:bg-transparent",
          warning:
            "bg-warning/75 text-warning-foreground ring-warning ring-inset shadow-md shadow-warning/50 [&>[data-close-button=true]>svg]:text-warning-foreground [&>[data-close-button=true]:hover]:bg-transparent",
          success:
            "bg-success/75 ring-success text-success-foreground ring-inset shadow-md shadow-success/50 [&>[data-close-button=true]>svg]:text-success-foreground [&>[data-close-button=true]:hover]:bg-transparent",
          cancelButton: buttonVariants({
            className: "",
            size: "sm",
            variant: "outline",
          }),
          actionButton: buttonVariants({
            className: "self-end justify-self-end",
            size: "sm",
            variant: "secondary",
          }),
          closeButton:
            "[&_svg]:size-5 size-6 absolute top-1/2 transform -translate-y-1/2 right-2 lg:right-3 left-auto grid place-content-center rounded-md border-0 [&_svg]:text-foreground",
        },
      }}
      {...props}
    />
  );
};

export default Toast;
