import type { Meta, StoryObj } from "@storybook/react";

import { Paragraph } from "./Paragraph";

const meta: Meta<typeof Paragraph> = {
  title: "UI Kit/Paragraph",
  tags: ["autodocs"],
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  args: {
    children: "Paragraph Content",
  },
};

export const WithEllipsis: Story = {
  render: () => {
    return (
      <div style={{ width: 300, border: "1px solid black" }}>
        <Paragraph ellipsis>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex
          nobis saepe qui, voluptate dolorum provident eaque, tempora eligendi
          blanditiis alias repellendus magni reiciendis accusantium. Ut
          architecto doloremque sit eius.
        </Paragraph>
      </div>
    );
  },
};
