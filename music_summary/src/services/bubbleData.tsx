import { fetchRecentPlayerdTrackAll } from '../services/appleMusic/recentPlayed';

export const bubbleData = async () => {
  const playerdRes = await fetchRecentPlayerdTrackAll();
  return playerdRes;
};
