import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import React from "react";
import { HeartFilled } from "@ant-design/icons";

const meta: Meta<typeof Button> = {
  title: "UI Kit/Button",
  tags: ["autodocs"],
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const Template = ({
  type,
  children,
  ...restOfArgs
}: React.ComponentProps<typeof Button>) => (
  <div>
    <Button type="primary" {...restOfArgs}>
      Primary
    </Button>
    <Button type="link" {...restOfArgs}>
      Link
    </Button>
    <Button {...restOfArgs}>Default</Button>
  </div>
);

export const AllType: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return <Template {...args} />;
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => {
    return <Template {...args} />;
  },
};

export const WithIcon: Story = {
  args: {
    icon: <HeartFilled />,
  },
  render: (args) => {
    return <Template {...args} />;
  },
};
