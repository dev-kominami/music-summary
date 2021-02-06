declare global {
  interface Window {
    MusicKit: any;
  }
}
window.MusicKit = window.MusicKit || {};
export default window;
