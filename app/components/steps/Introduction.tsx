import { Box, Text, Heading, Code, Container, Button } from "@chakra-ui/react";

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
        Captiononeer is a tool to automatically produce subtitle files (
        <Code>.srt</Code>) files from video or audio files.
      </Text>
      <Text mb={8}>
        Subtitles are created by running a machine learning model (Vosk) over
        the audio and are produced locally. No data ever leaves your computer.
      </Text>
      <Box>
        <Button onClick={() => onContinue()}>Start</Button>
      </Box>
    </Container>
  );
}
