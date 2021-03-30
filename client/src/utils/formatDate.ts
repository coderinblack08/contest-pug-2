import { isPast, formatDistanceToNow } from "date-fns";
import { format } from "date-fns";
import { useState, useEffect } from "react";

export const useFormatDate = (start: string, end: string) => {
  const [status, setStatus] = useState<string | null>(null);
  const [formatStart, setFormatStart] = useState("TBD");
  const [formatEnd, setFormatEnd] = useState("TBD");

  useEffect(() => {
    if (start) {
      const startDate = new Date(parseInt(start));
      setFormatStart(format(startDate, "MMMM dd, yyyy"));

      if (isPast(startDate)) {
        setStatus("In Session");
      } else {
        setStatus(`In ${formatDistanceToNow(startDate)}`);
      }
    } else {
      setStatus("TBD");
    }

    if (end) {
      const endDate = new Date(parseInt(end));
      setFormatEnd(format(endDate, "MMMM dd, yyyy"));
      if (isPast(endDate)) {
        setStatus("Ended");
      }
    }
  }, []);

  return [status, formatStart, formatEnd];
};
