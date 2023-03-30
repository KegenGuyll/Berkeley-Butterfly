import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SingleTextInput from ".";

export default {
  title: "Common/Input/TextInput",
  component: SingleTextInput,
} as ComponentMeta<typeof SingleTextInput>;

const Template: ComponentStory<typeof SingleTextInput> = (args) => (
  <SingleTextInput {...args} />
);

export const Default = Template.bind({});

Default.args = {};
