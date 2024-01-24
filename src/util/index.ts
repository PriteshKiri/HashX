import { useEffect, useState } from "react";

interface SnackbarProps {
  message: string;
  duration: number;
  type: string;
}

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarProps | null>(null);

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        setSnackbar(null);
      }, snackbar.duration * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [snackbar]);

  function showSnackbar(message: string, duration: number, type: string) {
    setSnackbar({ message, duration, type });
  }

  return { snackbar, showSnackbar };
};

const copyToClipboard = (text: string) => {
  const textarea: any = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

export { copyToClipboard, useSnackbar };


 export const  formatDate =(dateStr: string): string =>{
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(dateStr);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${months[monthIndex]} ${day}, ${year}`;
}
