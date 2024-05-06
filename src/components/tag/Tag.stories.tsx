import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "UI Kit/Tag",
  tags: ["autodocs"],
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "Text content",
  },
};

export const Dark: Story = {
  args: {
    children: "Text content",
    type: "dark",
  },
};

export const Light: Story = {
  args: {
    children: "Text content",
    type: "light",
  },
};
