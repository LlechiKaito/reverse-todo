import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface NetworkStackProps extends cdk.StackProps {
  projectName: string;
  environment: string;
}

export class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly appSecurityGroup: ec2.SecurityGroup;
  public readonly dbSecurityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: NetworkStackProps) {
    super(scope, id, props);

    const { projectName, environment } = props;

    // VPC with public subnets only (no NAT Gateway to minimize cost)
    this.vpc = new ec2.Vpc(this, 'Vpc', {
      vpcName: `${projectName}-vpc-${environment}`,
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'Isolated',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });

    // Security Group for application (Fargate tasks)
    this.appSecurityGroup = new ec2.SecurityGroup(this, 'AppSg', {
      vpc: this.vpc,
      securityGroupName: `${projectName}-app-sg-${environment}`,
      description: 'Security group for Fargate application tasks',
    });

    // Security Group for database
    this.dbSecurityGroup = new ec2.SecurityGroup(this, 'DbSg', {
      vpc: this.vpc,
      securityGroupName: `${projectName}-db-sg-${environment}`,
      description: 'Security group for RDS PostgreSQL',
    });

    // Allow app → DB on PostgreSQL port
    const DB_PORT = 5432;
    this.dbSecurityGroup.addIngressRule(
      this.appSecurityGroup,
      ec2.Port.tcp(DB_PORT),
      'Allow PostgreSQL from app',
    );

    // Tags
    cdk.Tags.of(this).add('Project', projectName);
    cdk.Tags.of(this).add('Environment', environment);
    cdk.Tags.of(this).add('ManagedBy', 'CDK');
  }
}
