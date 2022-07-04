/**
 * Available formats that the media can be in.
 */
export type MediaFormat = "video";

/**
 * Available languages that can be detected in the media stream.
 */
export type MediaLanguage = "english" | "japanese";

/**
 * Represents a job
 */
export type Job = {
  audioSource: MediaElementAudioSourceNode;
  language: MediaLanguage;
  streamDest: MediaStreamAudioDestinationNode;
  videoEl: HTMLVideoElement;
};

/**
 * An output of the Vosk language parser
 */
export type VoskResult = {
  result: Array<{
    conf: number;
    start: number;
    end: number;
    word: string;
  }>;
  text: string;
};
