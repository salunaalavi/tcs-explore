import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "UI Kit/Link",
  tags: ["autodocs"],
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "/dummy",
    children: "Go To Dummy Page",
    type: "next-link",
  },
};

export const NotNextLink: Story = {
  args: {
    href: "google.com",
    children: "https://google.com",
    type: "normal-link",
    target: "_blank",
  },
};
