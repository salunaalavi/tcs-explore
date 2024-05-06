import type { Meta, StoryObj } from "@storybook/react";

import { ArticleMeta } from "./ArticleMeta";
import React from "react";

const meta: Meta<typeof ArticleMeta> = {
  title: "Features - Articles/ArticleMeta",
  tags: ["autodocs"],
  component: ArticleMeta,
};

export default meta;
type Story = StoryObj<typeof ArticleMeta>;

export const Default: Story = {
  args: {
    createdAt: "December 9, 2022",
    username: "Anah Benešová",
  },
};

export const WithAvatarImage: Story = {
  args: {
    createdAt: "December 9, 2022",
    avatarSrc: "https://api.realworld.io/images/demo-avatar.png",
    username: "Anah Benešová",
  },
};
