import React from "react";
import { Empty as _Empty } from "antd";
import { WithStyle } from "@/types/styles";
import { WithDataTestId } from "@/types/testing";

type TEmpty = {
  description: string;
};
export const Empty = (props: WithDataTestId<WithStyle<TEmpty>>) => {
  return <_Empty {...props} />;
};
