import widonw from '../../Window.d';

export interface AppleMusicConfigureInfo {
  devToken: string;
  userToken: string;
  baseApiUrl: string;
  storefrontId: string;
}

export const configure = () => {
  const musickit = window.MusicKit.getInstance();
  const devToken = musickit.developerToken;
  const userToken = musickit.musicUserToken;
  const baseApiUrl = musickit.api.url;
  const storefrontId = musickit.storefrontId;
  const configureInfo: AppleMusicConfigureInfo = {
    devToken: devToken,
    userToken: userToken,
    baseApiUrl: baseApiUrl,
    storefrontId: storefrontId,
  };
  return configureInfo;
};
