import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI Kit/Skeleton",
  tags: ["autodocs"],
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const WithMultipleRows: Story = {
  args: {
    rows: 3,
  },
};

export const WithNoTitle: Story = {
  args: {
    title: false,
    rows: 2,
  },
};

export const WithCustomWidthTitle: Story = {
  args: {
    title: {
      width: "100",
    },
  },
};
