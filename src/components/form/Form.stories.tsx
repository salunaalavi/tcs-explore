import { Meta, StoryObj } from "@storybook/react";

import { Form } from "./Form";
import { Input } from "antd";
import { Button } from "../button";

const meta: Meta<typeof Form> = {
  title: "UI Kit/Form",
  tags: ["autodocs"],
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </>
    ),
  },
};

export const WithRules: Story = {
  args: {
    children: (
      <>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </>
    ),
  },
};
