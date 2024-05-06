import type { Meta, StoryObj } from "@storybook/react";

import { AuthenticatedNavbar } from "./AuthenticatedNavbar";

const meta: Meta<typeof AuthenticatedNavbar> = {
  title: "Features - Navigation/AuthenticatedNavbar",
  tags: ["autodocs"],
  component: AuthenticatedNavbar,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthenticatedNavbar>;

export const ActiveLink: Story = {};
