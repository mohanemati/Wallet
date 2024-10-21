import { useCallback } from "react";

function useAddComma() {
  const addComma = useCallback((value: any): any => {
    var valueString = String(Math.round(value));
    var reversed = valueString.split("").reverse();
    for (let i = 3; i < reversed.length; i += 4) {
      reversed.splice(i, 0, ",");
    }
    return reversed.reverse().join("");
  }, []);

  return addComma;
}

export default useAddComma;
