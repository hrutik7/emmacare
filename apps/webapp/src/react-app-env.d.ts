declare module "*.wav";
declare module "url-loader";
declare module "*.mp3" {
  const src: string;
  export default src;
}
declare module '*.wav' {
    const src: string;
    export default src;
  }