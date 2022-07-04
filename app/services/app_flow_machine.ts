import { createMachine } from "xstate";

export default createMachine({
  id: "app_flow_machine",
  initial: "introduction",
  states: {
    introduction: {
      on: { START: "addMedia" },
    },
    addMedia: {
      on: { CONTINUE: "process" },
    },
    process: {
      on: { COMPLETE: "done" },
    },
    done: {},
  },
});
