const execa = require("execa");
const path = require("path");

const log = require("./logger");
const { infoMsgs, warnMsgs, errMsgs } = require("./messages");

const watchQuarkSrc = async () => {
  log.info(infoMsgs.START_WATCHING_SRC);
  try {
    const watchSrcProcess = execa("rollup", [
      "-wc",
      path.resolve(__dirname, "../scripts/rollup.config.dev.js"),
    ]);
    await watchSrcProcess;
  } catch (error) {
    log.error(
`${errMsgs.ROLLUP_WATCH_FAILED}
  throws error: ${error}`
    );
  }
};

const watchPlayground = async () => {
  log.info(infoMsgs.START_WATCHING_PLAYGROUND);
  try {
    const watchPlaygroundProcess = execa("rollup", [
      "-wc",
      path.resolve(__dirname, "../scripts/rollup.config.play.js"),
    ]);
    await watchPlaygroundProcess;
  } catch (error) {
    log.error(
`${errMsgs.PLAYGROUND_WATCH_FAILED}
  throws error: ${error}`
    );
  }
}

watchQuarkSrc();
watchPlayground();
