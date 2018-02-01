# CLI application for user management in [File Browser](https://filebrowser.github.io/) application

This CLI tool was developed and tested with File Browser [v1.5.0](https://github.com/filebrowser/filebrowser/releases/tag/v1.5.0).

Further File Browser releases could brake compatibility with current tool, since API is not officially introduced and could be changed in any release.
Check following [#285 issue](https://github.com/filebrowser/filebrowser/issues/285) for details about API documentation.

# Installation

```sh
npm install filebrowser-usermanager -g
```

# Usage

```sh
filebrowser-user-add [username] [password] [directory]
```

### Following environment variables could be used

```sh
FILEBROWSER_BASEURL         # default http://localhost
FILEBROWSER_ADMIN_USERNAME  # default "admin"
FILEBROWSER_ADMIN_PASSWORD  # default "admin"
```