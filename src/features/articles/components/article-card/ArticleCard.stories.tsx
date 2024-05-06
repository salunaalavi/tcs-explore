import type { Meta, StoryObj } from "@storybook/react";

import { ArticleCard } from "./ArticleCard";
import React from "react";
import { requiredArgs } from "./ArticleCard.mock";

const meta: Meta<typeof ArticleCard> = {
  title: "Features - Articles/ArticleCard",
  tags: ["autodocs"],
  component: ArticleCard,
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: requiredArgs,
};

export const HasAvatarImage: Story = {
  args: {
    ...requiredArgs,
    avatarSrc: "https://api.realworld.io/images/demo-avatar.png",
  },
};

export const HasLiked: Story = {
  args: {
    ...requiredArgs,
    hasLiked: true,
  },
};
