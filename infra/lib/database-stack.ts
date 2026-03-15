import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

interface DatabaseStackProps extends cdk.StackProps {
  projectName: string;
  environment: string;
  vpc: ec2.Vpc;
  dbSecurityGroup: ec2.SecurityGroup;
}

const DB_PORT = 5432;
const DB_NAME = 'reverse_todo';
const DB_USERNAME = 'postgres';

export class DatabaseStack extends cdk.Stack {
  public readonly dbInstance: rds.DatabaseInstance;
  public readonly databaseUrl: string;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    const { projectName, environment, vpc, dbSecurityGroup } = props;

    // RDS PostgreSQL - t4g.micro for minimum cost
    this.dbInstance = new rds.DatabaseInstance(this, 'Database', {
      instanceIdentifier: `${projectName}-db-${environment}`,
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        ec2.InstanceSize.MICRO,
      ),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [dbSecurityGroup],
      databaseName: DB_NAME,
      credentials: rds.Credentials.fromGeneratedSecret(DB_USERNAME, {
        secretName: `${projectName}/${environment}/db-credentials`,
      }),
      multiAz: false,
      allocatedStorage: 20,
      maxAllocatedStorage: 50,
      storageType: rds.StorageType.GP3,
      backupRetention: cdk.Duration.days(7),
      deletionProtection: environment === 'prod',
      removalPolicy:
        environment === 'prod'
          ? cdk.RemovalPolicy.RETAIN
          : cdk.RemovalPolicy.DESTROY,
      port: DB_PORT,
    });

    // Construct DATABASE_URL for the application
    // The actual password is in Secrets Manager, referenced at runtime
    this.databaseUrl = `postgresql://${DB_USERNAME}:PLACEHOLDER@${this.dbInstance.dbInstanceEndpointAddress}:${DB_PORT}/${DB_NAME}?schema=public`;

    // Tags
    cdk.Tags.of(this).add('Project', projectName);
    cdk.Tags.of(this).add('Environment', environment);
    cdk.Tags.of(this).add('ManagedBy', 'CDK');
  }
}
