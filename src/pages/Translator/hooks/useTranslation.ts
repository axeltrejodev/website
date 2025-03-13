import { useCallback, useState } from "react";
import debounce from "just-debounce-it";
import translate from "../services/translate";

function useTranslation() {
  const [translation, setTranslation] = useState("");
  const updateTranslation = useCallback(
    async (from: string, to: string, text: string) => {
      if (text.trim() == "") {
        setTranslation("");
        return;
      }
      const result = await translate(from, to, text);
      if (result === null) {
        throw new Error("Empty translation result");
      }
      setTranslation(result);
    },
    []
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateTranslation = useCallback(
    debounce(updateTranslation, 500),
    [updateTranslation]
  );
  return {
    translation,
    updateTranslation: debouncedUpdateTranslation,
  };
}

export default useTranslation;
