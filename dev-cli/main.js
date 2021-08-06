const execa = require("execa");
const path = require("path");

const Log = require("./logger");
const log = new Log();
const { infoMsgs, warnMsgs, errMsgs } = require("./messages");

const watchQuarkSrc = async () => {
  log.info(infoMsgs.START_WATCHING_SRC);
  try {
    const watchSrcProcess = execa(
      "node",
      [path.resolve(__dirname, "../scripts/rollup.config.dev.js"), "--color"],
      {
        stdio: "pipe",
      }
    ).stdout.pipe(process.stdout);
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
  log.info(
    `Opening Quark Playground - ` +
      `Server listening at http://${
        process.env.HOST || 'localhost'
      }:${process.env.PORT || 8100}/`
  );
  try {
    const watchPlaygroundProcess = execa(
      "node",
      [path.resolve(__dirname, "../scripts/rollup.config.play.js"), "--color"],
      {
        stdio: "pipe",
      }
    ).stdout.pipe(process.stdout);
    await watchPlaygroundProcess;
  } catch (error) {
    log.error(
      `${errMsgs.PLAYGROUND_WATCH_FAILED}
  throws error: ${error}`
    );
  }
};

watchQuarkSrc();
watchPlayground();
