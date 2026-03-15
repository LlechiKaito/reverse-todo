#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { NetworkStack } from '../lib/network-stack';
import { DatabaseStack } from '../lib/database-stack';
import { AppStack } from '../lib/app-stack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? 'ap-northeast-1',
};

const projectName = 'reverse-todo';
const environment = app.node.tryGetContext('environment') ?? 'dev';

const networkStack = new NetworkStack(app, `${projectName}-network-${environment}`, {
  env,
  projectName,
  environment,
});

const databaseStack = new DatabaseStack(app, `${projectName}-database-${environment}`, {
  env,
  projectName,
  environment,
  vpc: networkStack.vpc,
  dbSecurityGroup: networkStack.dbSecurityGroup,
});

new AppStack(app, `${projectName}-app-${environment}`, {
  env,
  projectName,
  environment,
  vpc: networkStack.vpc,
  appSecurityGroup: networkStack.appSecurityGroup,
  databaseUrl: databaseStack.databaseUrl,
  dbInstance: databaseStack.dbInstance,
});
