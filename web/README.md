# Web

## Setup

```
npm install
```

## Start

```
npm run dev
```

## Prepare for deploy

Create `serverless.yml` .

```yml
myWebApplication:
  component: './node_modules/@sls-next/serverless-component'
```

## Deploy

```
npm run serverless
```