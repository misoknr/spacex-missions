import { createClient } from 'urql';

export const spacexClient = createClient({
    url: 'https://api.spacex.land/graphql',
});

export const MissionsQuery = (limit: number) => `{
  launchesPast(limit: ${limit}) {
    id
    mission_name
    launch_date_local
    launch_success
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
      first_stage {
        cores {
          core {
            reuse_count
            status
          }
          flight
          land_success
        }
      }
    }
  }
}
`;

export const MissionDetailQuery = (missionId?: String) => `{
  launch(id: "${missionId}") {
    id
    mission_name
    launch_date_local
    launch_success
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
      first_stage {
        cores {
          core {
            reuse_count
            status
          }
          flight
          land_success
        }
      }
      second_stage {
        payloads {
          payload_type
          payload_mass_kg
        }
      }
    }
  }
}`;
