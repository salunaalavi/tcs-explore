import type { Meta, StoryObj } from "@storybook/react";

import { Spin } from "./Spin";

const meta: Meta<typeof Spin> = {
  title: "UI Kit/Spin",
  tags: ["autodocs"],
  component: Spin,
};

export default meta;
type Story = StoryObj<typeof Spin>;

export const Default: Story = {};

export const Size: Story = {
  render: () => {
    return (
      <div>
        <div>
          <h2>Small</h2>
          <Spin size="small" />
        </div>

        <div>
          <h2>Default</h2>
          <Spin />
        </div>

        <div>
          <h2>Large</h2>
          <Spin size="large" />
        </div>
      </div>
    );
  },
};

export const Delayed: Story = {
  args: {
    delay: 1000,
  },
};
