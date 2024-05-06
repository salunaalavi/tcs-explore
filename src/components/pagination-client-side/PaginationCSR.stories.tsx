import type { Meta, StoryObj } from "@storybook/react";

import { PaginationCSR } from "./PaginationCSR";

const meta: Meta<typeof PaginationCSR> = {
  title: "UI Kit/PaginationCSR",
  tags: ["autodocs"],
  component: PaginationCSR,
};

export default meta;
type Story = StoryObj<typeof PaginationCSR>;

export const Default: Story = {
  args: {
    total: 500,
  },
};

export const WhenOnlyOnePage: Story = {
  args: {
    total: 9,
  },
  render: () => <span>When only one page no pagination is shown</span>,
};

export const ChangeDefaultPageSize: Story = {
  args: {
    total: 9,
    defaultPageSize: 1,
  },
};

export const CurrentPage: Story = {
  args: {
    total: 500,
    current: 23,
  },
};
