import type { Meta, StoryObj } from "@storybook/react";

import { Empty } from "./Empty";

const meta: Meta<typeof Empty> = {
  title: "UI Kit/Empty",
  tags: ["autodocs"],
  component: Empty,
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {
    description: "Data tidak ada",
  },
};
