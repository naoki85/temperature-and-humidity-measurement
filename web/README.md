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

This repository uses [serverless library](https://www.serverless.com/plugins/serverless-nextjs-plugin).  
First, setup AWS CLI in your local environment.  
Next, Create `serverless.yml` .

```yml
myWebApplication:
  component: './node_modules/@sls-next/serverless-component'
```

## Deploy

```
npm run serverless
```

Then the following services will be created in your AWS account.  

- CloudFront
- S3
- Lambda
- IAM