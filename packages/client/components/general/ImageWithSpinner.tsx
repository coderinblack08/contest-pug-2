import React, { DetailedHTMLProps, ImgHTMLAttributes, useState } from "react";
import { Loading } from "./Loading";

export const ImageWithSpinner: React.FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <img
        {...props}
        onLoad={() => setLoading(false)}
        className={`${loading ? "hidden" : className}`}
      />
      {loading ? <Loading size={6} /> : null}
    </div>
  );
};
