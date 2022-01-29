import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export class Example01LambdaWithMultipleLayersStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // LAmbda Layers
    const httpLayer = new lambda.LayerVersion(this, 'HttpLayer', {
      code: lambda.Code.fromAsset('lambda-layers/http'),
      // compatibleRuntimes: [lambda.Runtime.NODEJS_12_X], // optional
    });
    const nameGenerator = new lambda.LayerVersion(this, 'NameGeneratorLayer', {
      code: lambda.Code.fromAsset('lambda-layers/nameGenerator'),
      // compatibleRuntimes: [lambda.Runtime.NODEJS_12_X], // optional
    });

    // Lambda function
    new lambda.Function(this, 'LambdaWithLayer', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda-fns'),
      handler: 'lambda.handler',
      layers: [httpLayer, nameGenerator],
    });
  }
}
