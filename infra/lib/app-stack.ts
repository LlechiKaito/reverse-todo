import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

interface AppStackProps extends cdk.StackProps {
  projectName: string;
  environment: string;
  vpc: ec2.Vpc;
  appSecurityGroup: ec2.SecurityGroup;
  databaseUrl: string;
  dbInstance: rds.DatabaseInstance;
}

const API_PORT = 3001;
const WEB_PORT = 3000;
const API_CPU = 256;
const API_MEMORY = 512;
const WEB_CPU = 256;
const WEB_MEMORY = 512;
const ALB_LISTENER_PORT = 80;
const HEALTH_CHECK_INTERVAL = 30;
const HEALTH_CHECK_TIMEOUT = 5;
const HEALTHY_THRESHOLD = 2;
const UNHEALTHY_THRESHOLD = 3;

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const {
      projectName,
      environment,
      vpc,
      appSecurityGroup,
      databaseUrl,
      dbInstance,
    } = props;

    // ECR Repositories
    const apiRepo = new ecr.Repository(this, 'ApiRepo', {
      repositoryName: `${projectName}-api-${environment}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      emptyOnDelete: true,
    });

    const webRepo = new ecr.Repository(this, 'WebRepo', {
      repositoryName: `${projectName}-web-${environment}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      emptyOnDelete: true,
    });

    // ECS Cluster with Fargate Spot for cost savings
    const cluster = new ecs.Cluster(this, 'Cluster', {
      clusterName: `${projectName}-cluster-${environment}`,
      vpc,
      enableFargateCapacityProviders: true,
    });

    // ALB
    const alb = new elbv2.ApplicationLoadBalancer(this, 'Alb', {
      loadBalancerName: `${projectName}-alb-${environment}`,
      vpc,
      internetFacing: true,
      securityGroup: appSecurityGroup,
    });

    const listener = alb.addListener('HttpListener', {
      port: ALB_LISTENER_PORT,
      protocol: elbv2.ApplicationProtocol.HTTP,
    });

    // API Task Definition
    const apiTaskDef = new ecs.FargateTaskDefinition(this, 'ApiTaskDef', {
      cpu: API_CPU,
      memoryLimitMiB: API_MEMORY,
    });

    const apiContainer = apiTaskDef.addContainer('api', {
      image: ecs.ContainerImage.fromEcrRepository(apiRepo),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'api',
        logRetention: logs.RetentionDays.TWO_WEEKS,
      }),
      environment: {
        API_PORT: String(API_PORT),
        DATABASE_URL: databaseUrl,
      },
      portMappings: [{ containerPort: API_PORT }],
    });

    // Grant DB secret read access to API task
    if (dbInstance.secret) {
      dbInstance.secret.grantRead(apiTaskDef.taskRole);
    }

    // API Fargate Service (Spot for cost savings)
    const apiService = new ecs.FargateService(this, 'ApiService', {
      serviceName: `${projectName}-api-${environment}`,
      cluster,
      taskDefinition: apiTaskDef,
      desiredCount: 1,
      securityGroups: [appSecurityGroup],
      assignPublicIp: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      capacityProviderStrategies: [
        { capacityProvider: 'FARGATE_SPOT', weight: 1 },
        { capacityProvider: 'FARGATE', weight: 0, base: 0 },
      ],
    });

    // Web Task Definition
    const webTaskDef = new ecs.FargateTaskDefinition(this, 'WebTaskDef', {
      cpu: WEB_CPU,
      memoryLimitMiB: WEB_MEMORY,
    });

    webTaskDef.addContainer('web', {
      image: ecs.ContainerImage.fromEcrRepository(webRepo),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'web',
        logRetention: logs.RetentionDays.TWO_WEEKS,
      }),
      environment: {
        NEXT_PUBLIC_API_URL: `http://${alb.loadBalancerDnsName}`,
      },
      portMappings: [{ containerPort: WEB_PORT }],
    });

    // Web Fargate Service (Spot)
    const webService = new ecs.FargateService(this, 'WebService', {
      serviceName: `${projectName}-web-${environment}`,
      cluster,
      taskDefinition: webTaskDef,
      desiredCount: 1,
      securityGroups: [appSecurityGroup],
      assignPublicIp: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      capacityProviderStrategies: [
        { capacityProvider: 'FARGATE_SPOT', weight: 1 },
        { capacityProvider: 'FARGATE', weight: 0, base: 0 },
      ],
    });

    // ALB Target Groups and routing
    const apiTargetGroup = listener.addTargets('ApiTarget', {
      targetGroupName: `${projectName}-api-tg-${environment}`,
      port: API_PORT,
      targets: [apiService],
      healthCheck: {
        path: '/api/challenges',
        interval: cdk.Duration.seconds(HEALTH_CHECK_INTERVAL),
        timeout: cdk.Duration.seconds(HEALTH_CHECK_TIMEOUT),
        healthyThresholdCount: HEALTHY_THRESHOLD,
        unhealthyThresholdCount: UNHEALTHY_THRESHOLD,
      },
      conditions: [elbv2.ListenerCondition.pathPatterns(['/api/*'])],
      priority: 1,
    });

    const webTargetGroup = listener.addTargets('WebTarget', {
      targetGroupName: `${projectName}-web-tg-${environment}`,
      port: WEB_PORT,
      targets: [webService],
      healthCheck: {
        path: '/',
        interval: cdk.Duration.seconds(HEALTH_CHECK_INTERVAL),
        timeout: cdk.Duration.seconds(HEALTH_CHECK_TIMEOUT),
        healthyThresholdCount: HEALTHY_THRESHOLD,
        unhealthyThresholdCount: UNHEALTHY_THRESHOLD,
      },
    });

    // Outputs
    new cdk.CfnOutput(this, 'AlbDnsName', {
      value: alb.loadBalancerDnsName,
      description: 'Application Load Balancer DNS name',
    });

    new cdk.CfnOutput(this, 'ApiRepoUri', {
      value: apiRepo.repositoryUri,
      description: 'ECR repository URI for API',
    });

    new cdk.CfnOutput(this, 'WebRepoUri', {
      value: webRepo.repositoryUri,
      description: 'ECR repository URI for Web',
    });

    // Tags
    cdk.Tags.of(this).add('Project', projectName);
    cdk.Tags.of(this).add('Environment', environment);
    cdk.Tags.of(this).add('ManagedBy', 'CDK');
  }
}
