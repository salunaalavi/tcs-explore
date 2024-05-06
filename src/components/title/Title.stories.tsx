import type { Meta, StoryObj } from "@storybook/react";

import { Title } from "./Title";

const meta: Meta<typeof Title> = {
  title: "UI Kit/Title",
  tags: ["autodocs"],
  component: Title,
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    level: 1,
    children: "Text Content",
  },
};

export const LevelsOfTitle: Story = {
  render: () => (
    <div>
      <Title level={1}>Content</Title>
      <Title level={2}>Content</Title>
      <Title level={3}>Content</Title>
      <Title level={4}>Content</Title>
    </div>
  ),
};

export const WithEllipsis: Story = {
  render: () => {
    return (
      <div style={{ width: 300, border: "1px solid black" }}>
        <Title level={1} ellipsis>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex
          nobis saepe qui, voluptate dolorum provident eaque, tempora eligendi
          blanditiis alias repellendus magni reiciendis accusantium. Ut
          architecto doloremque sit eius.
        </Title>
      </div>
    );
  },
};
