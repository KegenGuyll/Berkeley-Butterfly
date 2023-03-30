import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import teamLeaderData from "@/data/__mock__/teamLeader.json";

import TabCard from ".";
import TeamLeaderCard from "@/components/players/teamLeaderCard";

export default {
  title: "Common/Card/Base",
  component: TabCard,
} as ComponentMeta<typeof TabCard>;

const Template: ComponentStory<typeof TabCard> = (args) => (
  <TabCard {...args} />
);

export const TabCardStyle = Template.bind({});

TabCardStyle.args = {
  categories: [
    {
      id: "1",
      active: true,
      name: "Offense",
    },
    {
      id: "2",
      active: false,
      name: "Defense",
    },
    {
      id: "3",
      active: false,
      name: "Special Teams",
    },
  ],
  content: {
    "1": (
      <TeamLeaderCard
        highlightedStat={teamLeaderData.passYds}
        keyStats={[
          {
            key: "passerRating",
            title: "QBR",
          },
          {
            key: "passTDs",
            title: "TD",
          },
        ]}
        player={teamLeaderData as any}
      />
    ),
    "2": <div>Defense</div>,
    "3": <div>Special Teams</div>,
  },
  footer: {
    href: "#",
    text: "",
  },
  header: "testing",
  contentPadding: false,
};
