import * as React from "react";
import {
  Input,
  Center,
  Stack,
  Radio,
  RadioGroup,
  Box,
  Text,
  Heading,
  Container,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { MediaLanguage, Job } from "../../services/types";

type PropsType = {
  onContinue: (details: Job) => void;
};

export default function AddMedia({ onContinue }: PropsType) {
  const [language, setLanguage] = React.useState<MediaLanguage>("english");
  const [media, setMedia] = React.useState<File | null>(null);

  const handleMediaSelected = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files === null) {
        return;
      }

      const file = event.target.files[0];

      setMedia(file);
    },
    [media]
  );

  const handleSubmit = React.useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (media === null) {
        return;
      }

      // Create a video element and assign the uploaded media to it
      const url = URL.createObjectURL(media);
      const videoEl = document.createElement("video");
      videoEl.src = url;
      videoEl.controls = true;

      var ctx = new AudioContext();

      // Create an source node from the videoElement
      var audioSource = ctx.createMediaElementSource(videoEl);

      // Create a MediaStream destination node
      var streamDest = ctx.createMediaStreamDestination();

      // Connect the source to the MediaStream
      audioSource.connect(streamDest);

      onContinue({
        audioSource,
        language,
        streamDest,
        videoEl,
      });
    },
    [onContinue, media]
  );

  return (
    <Container>
      <Heading fontSize="2xl" as="h2" mb="4">
        Add media
      </Heading>
      <Text mb={8}>
        Start by selecting a video to capture the subtitles from.
      </Text>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <FormControl mb={8} as="fieldset">
          <FormLabel as="legend" fontSize="2xl">
            Language
          </FormLabel>
          <RadioGroup
            onChange={(selectedLanguage: MediaLanguage) =>
              setLanguage(selectedLanguage)
            }
            value={language}
          >
            <Stack>
              <Radio value="english">English</Radio>
              <Radio value="japanese">Japanese</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl mb={8}>
          <FormLabel htmlFor="file" fontSize="2xl">
            File to process
          </FormLabel>
          <Input
            id="file"
            type="file"
            onChange={(event) => handleMediaSelected(event)}
          />
          <FormHelperText>
            Any browser supported video format (MP4, MKV or WebM)
          </FormHelperText>
        </FormControl>
        <Button disabled={media === null} type="submit">
          Next
        </Button>
      </form>
    </Container>
  );
}
