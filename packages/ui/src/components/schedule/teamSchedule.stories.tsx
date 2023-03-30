import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import data from "../../data/__mock__/teamSchedule.json";

import TeamSchedule from "./teamSchedule";

export default {
  title: "Components/Schedule",
  component: TeamSchedule,
} as ComponentMeta<typeof TeamSchedule>;

const Template: ComponentStory<typeof TeamSchedule> = (args) => (
  <TeamSchedule {...args} />
);

export const Default = Template.bind({});

Default.args = {
  teamId: 972029956,
  schedule: data,
};
