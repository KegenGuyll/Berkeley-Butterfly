import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import teamScheduleData from "@/data/__mock__/teamSchedule.json";
import teamLeaderData from "@/data/__mock__/teamLeader.json";

import BaseCard from "./baseCard";
import TeamSchedule from "@/components/schedule/teamSchedule";
import TeamLeaderCard from "@/components/players/teamLeaderCard";

export default {
  title: "Common/Card/Base",
  component: BaseCard,
} as ComponentMeta<typeof BaseCard>;

const Template: ComponentStory<typeof BaseCard> = (args) => (
  <div>
    <BaseCard {...args} />
  </div>
);

export const Teamschedule = Template.bind({});

Teamschedule.args = {
  children: <TeamSchedule teamId={972029956} schedule={teamScheduleData} />,
  header: "Team Schedule",
  footer: {
    text: "Full Schedule",
    href: "#",
  },
  divider: true,
  contentPadding: false,
};

export const TeamLeaders = Template.bind({});

TeamLeaders.args = {
  children: (
    <TeamLeaderCard
      seasonIndex={0}
      highlightedStat={{
        title: "Passing Yards",
        value: teamLeaderData.passYds,
      }}
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
  header: "Team Leaders",
  footer: {
    text: "Full Team Statistics",
    href: "#",
  },
  divider: true,
  contentPadding: false,
};
