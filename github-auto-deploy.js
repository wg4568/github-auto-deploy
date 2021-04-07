const express = require("express");
const path = require("path");
const chalk = require("chalk");
const cp = require("child_process");
const config = require("./config.json");

function log(repo, message, ...params) {
    console.log(chalk.cyan(`[${repo}]`), message, ...params);
}

function execute(repo) {
    var proc = cp.exec(
        repo.script,
        {
            cwd: path.resolve(repo.dir)
        },
        () => {
            log(repo.name, "Done");
        }
    );

    proc.stdout.on("data", (dat) => {
        dat.split("\n").forEach((line) => {
            log(repo.name, ">", line);
        });
    });
}

const app = express();
app.use(express.json());

config.repos.forEach((repo) => {
    if (repo.hook.startsWith("/")) repo.hook = repo.hook.slice(1);

    app.post("/" + repo.hook, (req, res) => {
        if (req.body.ref == repo.branch) {
            log(repo.name, "Detected update");
            execute(repo);
        }

        res.status(200).end();
    });

    log(
        "gh-auto-deploy",
        `bound ${repo.name} to ::${config.port}/${repo.hook}`
    );
});

app.listen(config.port, () =>
    log("gh-auto-deploy", `Server now listening on port ${config.port}`)
);
