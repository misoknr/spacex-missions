import React from 'react';
import { Mission } from "./types/MissionTable";

const MissionDetail = (mission: Mission) => {

    return (
        <div>
            <h2>{mission.mission_name}</h2>
            <a href={mission.links.video_link.toString()}>YouTube link</a>
        </div>
    )
};

export default MissionDetail;
