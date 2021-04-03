import { formatDistanceToNow } from "date-fns";
import { useFormikContext } from "formik";
import debounce from "lodash.debounce";
import React, { useEffect, useCallback, useState } from "react";
import useInterval from "../utils/hooks/useInterval";
// import { TimeCircle } from "react-iconly";

export const AutoSave: React.FC<{ debounceMs: number }> = ({ debounceMs }) => {
  const formik = useFormikContext();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const debouncedSubmit = useCallback(
    debounce(() => {
      formik.submitForm().then(() => setLastSaved(new Date()));
    }, debounceMs),
    [debounceMs, formik.submitForm]
  );

  useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);

  useInterval(() => {
    if (formik.isSubmitting) {
      setResult("Saving...");
    } else if (Object.keys(formik.errors).length > 0) {
      setResult("Error while saving");
    } else if (lastSaved !== null) {
      setResult(
        `Last saved ${formatDistanceToNow(lastSaved || new Date(), {
          addSuffix: true,
        })}`
      );
    }
  }, 1000);

  return (
    <div className="flex items-center mt-2">
      <p className="text-sm text-gray-400">{result}</p>
    </div>
  );
};
