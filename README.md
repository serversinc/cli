# cli

Interact with ServerSinc through the CLI

![](./banner.png)

## Install

```sh
npm i @serversinc/cli -g
```

## Commands

#### Servers

```sh
sinc servers:list

sinc servers:get --id='id'
```

#### Applications

```sh
sinc apps:list 

# optionally
sinc apps:list --server='server_id'

sinc apps:get --id='id'
```

#### Deploys

```sh
sinc deploys:list --app='id'

sinc deploys:get --app='app_id' --id='id'
```

#### Environment Variables

Sync your local .env files to applications in ServerSinc.

**--app** - (Optional) The App ID. Required if there's no local config file  
**--env** - (Optional) The .env file name. Required if there's no local config file  
**--saveconfig** - (optional) Creates a local JSON with app & env values for quicker command execution  

```sh
sinc env:sync --app='id' --env='file_name' --saveconfig
```
