export interface Mission {
    mission_name: String;
    launch_date_local: String;
    rocket: {
        rocket_name: String;
    }
    launch_success: Boolean;
    links: {
        video_link: String;
    }
};
