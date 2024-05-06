import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI Kit/Tabs",
  tags: ["autodocs"],
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const children = (
  <>
    <Tabs.TabPane key="1" tab="Tab 1">
      Child of Tab 1
    </Tabs.TabPane>
    <Tabs.TabPane key="2" tab="Tab 2">
      Child of Tab 2
    </Tabs.TabPane>
  </>
);
export const Default: Story = {
  args: {
    children,
  },
};

export const DefaultActiveKey: Story = {
  args: {
    children,
    defaultActiveKey: "2",
  },
};

export const ActiveKey: Story = {
  args: {
    children,
    activeKey: "2",
  },
};
