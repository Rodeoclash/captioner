import * as React from "react";

import {
  Flex,
  Box,
  Text,
  Heading,
  Code,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { createModel } from "vosk-browser";

import { VoskResult, Job } from "../../services/types";

type PropsType = {
  job: Job;
  onContinue: () => void;
};

export default function PerformJob({ job, onContinue }: PropsType) {
  const [utterances, setUtterances] = React.useState<VoskResult[]>([]);
  const [downloadingModel, setDownloadingModel] =
    React.useState<boolean>(false);
  const videoContainerRef = React.useRef<HTMLDivElement | null>(null);

  const handleMetaDataLoaded = React.useCallback(async () => {
    const videoEl = job.videoEl;
    const language = job.language;

    const channel = new MessageChannel();

    setDownloadingModel(true);

    const model = await createModel(`/models/${language}.zip`);

    setDownloadingModel(false);

    model.registerPort(channel.port1);

    const recognizer = new model.KaldiRecognizer(48000); // NEED TO GET KHZ HERE
    recognizer.setWords(true);

    recognizer.on("result", (message: any) => {
      const result: VoskResult = message.result;

      if (result.text === "") {
        return;
      }

      setUtterances((utt: VoskResult[]) => [...utt, result]);
    });

    const audioContext = new AudioContext();
    await audioContext.audioWorklet.addModule("recognizer-processor.js");
    const recognizerProcessor = new AudioWorkletNode(
      audioContext,
      "recognizer-processor",
      { channelCount: 1, numberOfInputs: 1, numberOfOutputs: 1 }
    );
    recognizerProcessor.port.postMessage(
      { action: "init", recognizerId: recognizer.id },
      [channel.port2]
    );
    recognizerProcessor.connect(audioContext.destination);

    const source = audioContext.createMediaStreamSource(job.streamDest.stream);
    source.connect(recognizerProcessor);

    videoEl.play();
  }, []);

  /**
   * Populate the video element
   */
  React.useEffect(() => {
    if (videoContainerRef.current === null) {
      return;
    }

    const videoEl = job.videoEl;

    videoContainerRef.current.replaceChildren(videoEl);

    videoEl.addEventListener("loadedmetadata", handleMetaDataLoaded);

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleMetaDataLoaded);
      videoContainerRef.current?.replaceChildren();
    };
  }, [job]);

  const renderedUtterances = utterances.map((utterance) => {
    const start = utterance.result[0].start;

    return (
      <Text mb={4} borderLeft="4px" borderColor="gray.200" pl={4} key={start}>
        <Code>{Math.floor(start)}s</Code>: {utterance.text}
      </Text>
    );
  });

  return (
    <>
      <Heading fontSize="2xl" as="h2" mb="4">
        Analysing video
      </Heading>
      <Flex>
        <Box ref={videoContainerRef} />
        <Container>
          {downloadingModel === true && (
            <Flex mb={4}>
              <Spinner mr={4} />
              <Text>Downloading language model</Text>
            </Flex>
          )}
          {utterances.length === 0 && downloadingModel === false && (
            <Text mb={4} fontSize="sm">
              <em>
                Analysis started, results will appear shortly when language is
                detected.
              </em>
            </Text>
          )}
          {utterances.length > 0 && (
            <>
              <Text fontSize={"sm"} mb={8}>
                <strong>Found {utterances.length} snippets</strong>
              </Text>
              {renderedUtterances.slice(-5)}
            </>
          )}
        </Container>
      </Flex>
    </>
  );
}
