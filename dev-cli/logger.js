const chalk = require("chalk");
const slogStdout = require("single-line-log").stdout;

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  second: "2-digit",
});
const errorColorChalk = chalk.hex("#f76565");

const recordTime = () => chalk.cyan(`[ ${dateFormatter.format(Date.now())} ]`);
/** 传入日志打印方法，创建 logger
 * @param {() => void} logger
 */
const createLogger = (logger) => (msg, level) => {
  logger(`${recordTime()} - ${level} - ${msg}\r`);
};
const _log = createLogger(console.log);
const slog = createLogger(slogStdout);

const logLevel = {
  INFO: chalk.blue("INFO"),
  WARN: chalk.yellow("WARN"),
  ERROR: errorColorChalk("ERROR"),
};
module.exports = class Log {
  isSingleLineMode = false;
  constructor(logger) {
    this.logger = logger || _log;
  }

  singleLineMode() {
    this.logger = slog;
    this.singleLineMode = true;
    return this;
  }
  reset() {
    this.logger = _log;
    this.singleLineMode = false;
    return this;
  }
  /** @param {string} msg */
  info(msg) {
    this.logger(msg, logLevel.INFO);
    return this;
  }
  /** @param {string} msg */
  warn(msg) {
    this.logger(chalk.yellow(msg), logLevel.WARN);
    return this;
  }
  /** @param {string} msg */
  error(msg) {
    this.logger(errorColorChalk(msg), logLevel.ERROR);
    return this;
  }
  clear() {
    if (this.isSingleLineMode) {
      this.logger.clear();
    }
    return this;
  }
}
