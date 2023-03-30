import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TeamImage from "./teamImage";

export default {
  title: "Common/Image",
  component: TeamImage,
} as ComponentMeta<typeof TeamImage>;

const Template: ComponentStory<typeof TeamImage> = (args) => {
  return (
    <div className="bg-gray-100 p-16">
      <div className="h-16 w-16 relative">
        <TeamImage {...args} />
      </div>
    </div>
  );
};

export const TeamImages = Template.bind({});

TeamImages.args = {
  teamLogoId: 31,
};
