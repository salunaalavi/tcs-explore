import type { Meta, StoryObj } from "@storybook/react";

import { PopularTags } from "./PopularTags";
import React from "react";
const meta: Meta<typeof PopularTags> = {
  title: "Features - Tags/PopularTags",
  tags: ["autodocs"],
  component: PopularTags,
};

export default meta;
type Story = StoryObj<typeof PopularTags>;

const tags: React.ComponentProps<typeof PopularTags>["tags"] = [
  "implementations",
  "welcome",
  "introduction",
  "codebaseShow",
  "ipsum",
  "qui",
  "et",
  "quia",
  "cupiditate",
  "deserunt",
];

export const Default: Story = {
  args: {
    tags,
  },
};
