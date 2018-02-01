# CLI application for user management in [File Manager](https://hacdias.github.io/filemanager/) application

This CLI tool was developed and tested with File Manager [v1.4.6](https://github.com/hacdias/filemanager/releases/tag/v1.4.6).

Further File Manager releases could brake compatibility with current tool, since API is not officially introduced and could be changed in any release.
Check following [#285 issue](https://github.com/hacdias/filemanager/issues/285) for details about API documentation.

# Installation

```sh
git clone ssh://git@git.isdev.de:9022/ironshark/filemanager-usermanager.git
cd filemanager-usermanager
npm i
npm link
```

# Usage

```sh
add-filemanager-user [username] [password] [directory]
```

### Following environment variables could be used

```sh
FILEMANAGER_BASEURL         # default http://localhost
FILEMANAGER_ADMIN_USERNAME  # default "admin"
FILEMANAGER_ADMIN_PASSWORD  # default "admin"
```