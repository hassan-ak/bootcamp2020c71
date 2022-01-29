# Step24-0 Lambda with single layer

## Reading Material

- [Lambda Layers with NodeJS](https://www.youtube.com/watch?v=-r4GJlkdJo0)

## Steps to code

1. Create a new directory using `mkdir example00_lambda_with_single_layer`
2. Navigate to newly created directory using `cd example00_lambda_with_single_layer`
3. Create new cdk app using `cdk init app --language typescript`
4. Auto compile the code using `npm run watch`
5. Install lambda module in the stack using `npm i @aws-cdk/aws-lambda` and update "./lib/example00_lambda_with_single_layer-stack.ts" to create a lambda function

   ```js
   import * as lambda from '@aws-cdk/aws-lambda';
   new lambda.Function(this, 'LambdaWithLambdaLayer', {
     runtime: lambda.Runtime.NODEJS_14_X,
     code: lambda.Code.fromAsset('lambda-fns'),
     handler: 'lambda.handler',
     layers: [lambdaLayer],
   });
   ```

6. As the lambda function uses lambda layers so we need to define lambda layers. Update "./lib/example00_lambda_with_single_layer-stack.ts" to define a lambda layer

   ```js
   const lambdaLayer = new lambda.LayerVersion(this, 'LambdaLayer', {
     code: lambda.Code.fromAsset('lambda-layer'),
     // compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
   });
   ```

7. Create "./lambda-fns/lambda.ts" to define a lambda handler code

   ```js
   const axios = require('axios');
   exports.handler = async (event: any, context: any) => {
     const result = await axios.get(
       'https://jsonplaceholder.typicode.com/todos/1'
     );
     return result.data;
   };
   ```

8. Libraries to be used in lambda function can be stored seprately as lambda layer so create a new folder using `mkdir lambda-layer/nodejs` and navigate to this folder using `cd lambda-layer/nodejs`then initilize it as a npm project using `npm init --yes`. Install the required packages in this folder such as axios using `npm i axios`
9. Deploy the app using `cdk deploy`
10. Test usng console
11. Destroy the app using `cdk destroy`
