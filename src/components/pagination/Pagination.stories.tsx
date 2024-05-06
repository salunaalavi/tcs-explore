import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "UI Kit/Pagination",
  tags: ["autodocs"],
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    total: 500,
    linkPrefix: "/page",
  },
};

export const WhenOnlyOnePage: Story = {
  args: {
    total: 9,
    linkPrefix: "/page",
  },
  render: () => <span>When only one page no pagination is shown</span>,
};

export const ChangeDefaultPageSize: Story = {
  args: {
    total: 9,
    defaultPageSize: 1,
    linkPrefix: "/page",
  },
};

export const DefaultCurrentPage: Story = {
  args: {
    total: 500,
    defaultCurrent: 23,
    linkPrefix: "/page",
  },
};
