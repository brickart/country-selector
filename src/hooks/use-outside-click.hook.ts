import { RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<HTMLElement>, callback: Function) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      return callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
