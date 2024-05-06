import type { Meta, StoryObj } from "@storybook/react";

import { ArticleForm } from "./ArticleForm";
import React from "react";

const meta: Meta<typeof ArticleForm> = {
  title: "Features - Articles/ArticleForm",
  tags: ["autodocs"],
  component: ArticleForm,
};

export default meta;
type Story = StoryObj<typeof ArticleForm>;

export const Default: Story = {};

export const IsSubmitting: Story = {
  args: {
    isSubmitting: true,
  },
};

export const WithInitialValues: Story = {
  args: {
    initialValues: {
      title: "Some random title that nobody cares",
      description: "Random with 100% uncertainty. This is a lie",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Nisi lacus sed viverra tellus. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Egestas sed tempus urna et. Maecenas pharetra convallis posuere morbi. At urna condimentum mattis pellentesque id. Porta non pulvinar neque laoreet. Etiam dignissim diam quis enim lobortis. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Duis ultricies lacus sed turpis tincidunt id. Duis at tellus at urna condimentum mattis pellentesque. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Sem fringilla ut morbi tincidunt augue. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Quisque non tellus orci ac auctor augue.

Vel orci porta non pulvinar neque laoreet suspendisse interdum. Ipsum dolor sit amet consectetur adipiscing elit ut. Pharetra pharetra massa massa ultricies. Tellus elementum sagittis vitae et leo duis ut diam. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Nam aliquam sem et tortor consequat id porta nibh venenatis. Id nibh tortor id aliquet lectus proin nibh. Accumsan lacus vel facilisis volutpat est velit. Fames ac turpis egestas integer eget aliquet nibh praesent tristique. Id eu nisl nunc mi ipsum. Nisl vel pretium lectus quam id leo in. Adipiscing diam donec adipiscing tristique risus. Placerat vestibulum lectus mauris ultrices eros in. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Fermentum iaculis eu non diam phasellus vestibulum lorem. Odio ut sem nulla pharetra diam sit amet. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Sed lectus vestibulum mattis ullamcorper velit sed. Orci ac auctor augue mauris augue neque gravida. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.

Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Egestas diam in arcu cursus euismod quis viverra nibh cras. Adipiscing diam donec adipiscing tristique risus nec feugiat. Viverra mauris in aliquam sem fringilla ut. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Ultrices vitae auctor eu augue ut lectus arcu. Diam donec adipiscing tristique risus nec feugiat in fermentum. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Dolor sed viverra ipsum nunc aliquet bibendum enim. Sed euismod nisi porta lorem mollis. Vestibulum mattis ullamcorper velit sed ullamcorper morbi.`,
      tagList: ["random", "fun", "quirky"].join(","),
    },
  },
};
