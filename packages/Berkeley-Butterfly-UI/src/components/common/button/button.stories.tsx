import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import Button from ".";

export default {
  title: "Common/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return (
    <div className="bg-gray-100 p-16">
      <Button {...args} />
    </div>
  );
};

const defaultArgs = {
  children: "Button",
};

export const Primary = Template.bind({});

Primary.args = {
  ...defaultArgs,
  variant: "primary",
};

export const Secondary = Template.bind({});

Secondary.args = {
  ...defaultArgs,
  variant: "secondary",
};

export const Icon = Template.bind({});

Icon.args = {
  variant: "icon",
  children: <FontAwesomeIcon icon={faClipboard} />,
};

export const Chip = Template.bind({});

Chip.args = {
  ...defaultArgs,
  variant: "chip",
};
