import { Link, Box, Text, Heading, Container, Button } from "@chakra-ui/react";

type PropsType = {
  onContinue: () => void;
};

export default function Instructions({ onContinue }: PropsType) {
  return (
    <Container>
      <Heading fontSize="2xl" as="h2" mb="4">
        Introduction
      </Heading>
      <Text mb={4}>
        Captioner is a small application to test the automatic generation of
        subtitles on video.
      </Text>
      <Text mb={8}>
        Subtitles are created by running a machine learning model (using{" "}
        <Link
          href="https://github.com/ccoreilly/vosk-browser"
          isExternal
          textDecoration="underline"
        >
          vosk-browser
        </Link>
        ) via WASM over the audio and are produced locally. No data ever leaves
        your computer.
      </Text>
      <Box>
        <Button onClick={() => onContinue()}>Start</Button>
      </Box>
    </Container>
  );
}
