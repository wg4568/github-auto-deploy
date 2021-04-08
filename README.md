# github-auto-deploy

Yet another Github auto-deploy server.

Required: `config.json`

```json
{
    "port": 8000,

    "repos": [
        {
            "hook": "where to bind",
            "name": "full repo name, ex: account/repo",
            "dir": "path to local repository",
            "branch": "refspec, ex: refs/heads/main",
            "script": "executed in dir, git pull"
        }
    ]
}
```

Ensure that your webhook is configured on PUSH only.

[Read about it](https://gardna.blogliam.com/2021/04/06/auto-deploy/)
