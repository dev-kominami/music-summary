// interface IWindow extends Window {
//   MusicKit: ()=>void;
// }
// declare const window: IWindow;
// export default window;
declare global {
  interface Window {
    MusicKit: any;
  }
}
window.MusicKit = window.MusicKit || {};
export default window;
