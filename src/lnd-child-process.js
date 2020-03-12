const os = require("os");
const fs = require("fs");
const path = require("path");
const cp = require("child_process");

function getProcessName(binName) {
  const filename = os.platform() === "win32" ? `${binName}.exe` : binName;
  const filePath = __dirname.includes("asar")
    ? path.join(__dirname, "..", "..", "assets", "bin", os.platform(), filename)
    : path.join(__dirname, "..", "assets", "bin", os.platform(), filename);
  return fs.existsSync(filePath) ? filePath : filename;
}

async function startChildProcess(name, args, logger) {
  return new Promise((resolve, reject) => {
    const processName = getProcessName(name);
    logger.info(`Using ${name} in path ${processName}`);
    const childProcess = cp.spawn(processName, args);
    childProcess.stdout.on("data", data => {
      logger.info(`${name}: ${data}`);
      resolve(childProcess);
    });
    childProcess.stderr.on("data", data => {
      logger.error(`${name} Error: ${data}`);
      reject(new Error(data));
    });
    childProcess.on("error", reject);
  });
}

async function startLndProcess(lndSettingsDir, logger, lndArgs = []) {
  console.log(lndSettingsDir);
  if (!lndSettingsDir) throw new Error("lndSettingsDir not set!");
  let args = [
    "--bitcoin.active",
    "--debuglevel=info",
    "--maxbackoff=2s",
    `--lnddir=${lndSettingsDir}`,
    `--routing.assumechanvalid`,
    "--historicalsyncinterval=20m",
    "--autopilot.private",
    "--autopilot.minconfs=1",
    "--autopilot.conftarget=16",
    "--autopilot.allocation=1.0",
    "--autopilot.heuristic=externalscore:0.95",
    "--autopilot.heuristic=preferential:0.05",
    "--bitcoin.mainnet",
    "--bitcoin.node=neutrino",
    "--neutrino.addpeer=btcd-mainnet.lightning.computer",
    "--neutrino.feeurl=https://nodes.lightning.computer/fees/v1/btc-fee-estimates.json",
    "--neutrino.assertfilterheader=230000:1308d5cfc6462f877a5587fd77d7c1ab029d45e58d5175aaf8c264cee9bde760",
    "--rpclisten=localhost:10009"
    // lndPeerPort ? `--listen=localhost:${lndPeerPort}` : "",
    // lndRestPort ? `--restlisten=localhost:${lndRestPort}` : "",
    // lndProfilingPort ? `--profile=${lndProfilingPort}` : ""
  ];
  args = args.concat(lndArgs);
  return startChildProcess("lnd", args, logger);
}

module.exports = { startLndProcess };
