const chalk = require("chalk");

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  second: "2-digit",
});
const recordTime = () => chalk.cyan(`[ ${dateFormatter.format(Date.now())} ]`);
/** 
 * @param {string} msg
 * @param {string} level
 */
const _log = (msg, level) => {
  console.log(`${recordTime()} - ${level} - ${msg}`);
};
const errorColorChalk = chalk.hex('#f76565');
const log = {
  /** @param {string} msg */
  info: (msg) => _log(msg, logLevel.INFO),
  /** @param {string} msg */
  warn: (msg) => _log(chalk.yellow(msg), logLevel.WARN),
  /** @param {string} msg */
  error: (msg) => _log(errorColorChalk(msg), logLevel.ERROR)
}
const logLevel = {
  INFO: chalk.blue('INFO'),
  WARN: chalk.yellow('WARN'),
  ERROR: errorColorChalk('ERROR')
};

module.exports = log