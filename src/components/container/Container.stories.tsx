import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "UI Kit/Container",
  tags: ["autodocs"],
  component: Container,
};

export default meta;
type Story = StoryObj<typeof Container>;

/**
 * Try to resize viewport to see the max width resize
 */
export const Default: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugiat corporis laudantium quis officiis hic amet cumque. Vitae tempora itaque repellat exercitationem impedit eaque cupiditate dolorem veniam voluptate. Veritatis, dolore!",
  },
  render: (args) => (
    <Container {...args} style={{ border: "1px solid orangered" }} />
  ),
};
