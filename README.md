# github-auto-deploy

Yet another Github auto-deploy server.

Required: `config.json`

```json
{
    "port": 8000,

    "repos": [
        {
            "hook": "where to bind",
            "dir": "path to local repository",
            "branch": "refspec, ex: refs/heads/main",
            "script": "executed in dir, git pull"
        }
    ]
}
```

Ensure that your webhook is configured on PUSH only.
