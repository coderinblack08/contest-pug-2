import React, { DetailedHTMLProps, ImgHTMLAttributes, useState } from "react";
import { Spinner } from "./Spinner";

export const ImageWithSpinner: React.FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <img
        {...props}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(true)}
        className={`${loading ? "hidden" : className}`}
      />
      {loading ? <Spinner size={6} /> : null}
    </div>
  );
};
