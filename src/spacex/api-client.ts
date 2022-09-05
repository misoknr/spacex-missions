import { createClient } from 'urql';

export const spacexClient = createClient({
    url: 'https://api.spacex.land/graphql',
});

export const MissionsQuery = `{
  launchesPast(limit: 10) {
    mission_name
    launch_date_local
    rocket {
      rocket_name
    }
    launch_success
    links {
      video_link
    }
  }
}`;
