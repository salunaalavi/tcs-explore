import React from "react";
import { Skeleton as _Skeleton } from "antd";
import { WithStyle } from "@/types/styles";
import { WithDataTestId } from "@/types/testing";

type TSkeleton = {
  rows?: number;
  title?: { width: number | string } | boolean;
};
export const Skeleton = ({
  title = true,
  rows = 0,
  ...props
}: WithDataTestId<WithStyle<TSkeleton>>) => {
  return (
    <_Skeleton
      active
      paragraph={{ rows }}
      title={title}
      {...props}
      data-testid={props["data-testid"]}
    />
  );
};
