export interface Mission {
    id: string;
    mission_name: string;
    launch_date_local: string;
    rocket: {
        rocket_name: string;
        first_stage: {
            cores: Array<Core>;
        }
        second_stage: {
            payloads: Array<Payload>;
        }
    }
    launch_success: boolean;
    links: {
        article_link: string;
        video_link: string;
    }
}

export interface Core {
    core: {
        reuse_count: number;
        status: string;
    }
    flight: number;
    land_success: boolean;
}

export interface Payload {
    payload_type: string;
    payload_mass_kg: number;
}
