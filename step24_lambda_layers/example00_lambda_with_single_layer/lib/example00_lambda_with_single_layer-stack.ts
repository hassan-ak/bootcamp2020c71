import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export class Example00LambdaWithSingleLayerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda layer
    const lambdaLayer = new lambda.LayerVersion(this, 'LambdaLayer', {
      code: lambda.Code.fromAsset('lambda-layer'),
      // compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
    });

    // Lambda function
    new lambda.Function(this, 'LambdaWithLambdaLayer', {
      runtime: lambda.Runtime.NODEJS_14_X, // execution environment
      code: lambda.Code.fromAsset('lambda-fns'), // code loaded from the "lambda" directory
      handler: 'lambda.handler', // file is "lambda", function is "handler"
      layers: [lambdaLayer],
    });
  }
}
