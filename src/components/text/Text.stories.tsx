import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "UI Kit/Text",
  tags: ["autodocs"],
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Text Content",
  },
};

export const WithEllipsis: Story = {
  render: () => {
    return (
      <div style={{ width: 300, border: "1px solid black" }}>
        <Text ellipsis>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex
          nobis saepe qui, voluptate dolorum provident eaque, tempora eligendi
          blanditiis alias repellendus magni reiciendis accusantium. Ut
          architecto doloremque sit eius.
        </Text>
      </div>
    );
  },
};
