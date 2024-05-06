import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Features - Navigation/Navbar",
  tags: ["autodocs"],
  component: Navbar,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const ActiveLink: Story = {
  render: () => {
    return (
      <div
        style={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ color: "white" }}>Active link: home</h2>
          <Navbar activeLink="home" />
        </div>

        <div>
          <h2 style={{ color: "white" }}>Active link: login</h2>
          <Navbar activeLink="login" />
        </div>

        <div>
          <h2 style={{ color: "white" }}>Active link: sign up</h2>
          <Navbar activeLink="sign-up" />
        </div>
      </div>
    );
  },
};
