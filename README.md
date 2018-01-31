# CLI application for user management in filemanager application

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