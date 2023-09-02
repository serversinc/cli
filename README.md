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
