declare module 'use-sound' {
    const useSound: (url: string, options?: object) => [() => void, { stop: () => void, pause: () => void, sound: object }];
    export default useSound;
  }
  