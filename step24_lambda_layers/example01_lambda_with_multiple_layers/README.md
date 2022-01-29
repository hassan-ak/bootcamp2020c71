# Step24-0 Lambda with multiple layers

## Reading Material

- [How to use layers with Lambda functions?](https://www.youtube.com/watch?v=i12H4cUFudU&ab_channel=BiteSizeAcademy)

## Steps to code

1. Create a new directory using `mkdir example01_lambda_with_multiple_layers`
2. Navigate to newly created directory using `cd example01_lambda_with_multiple_layers`
3. Create new cdk app using `cdk init app --language typescript`
4. Auto compile the code using `npm run watch`
5. Install lambda module in the stack using `npm i @aws-cdk/aws-lambda` and update "./lib/example01_lambda_with_multiple_layers-stack.ts" to create a lambda function

   ```js
   import * as lambda from '@aws-cdk/aws-lambda';
   new lambda.Function(this, 'LambdaWithLayer', {
     runtime: lambda.Runtime.NODEJS_12_X,
     code: lambda.Code.fromAsset('lambda-fns'),
     handler: 'lambda.handler',
     layers: [httpLayer, nameGenerator],
   });
   ```

6. Update "./lib/example01_lambda_with_multiple_layers-stack.ts" to create a lambda layers

   ```js
   const httpLayer = new lambda.LayerVersion(this, 'HttpLayer', {
     code: lambda.Code.fromAsset('lambda-layers/http'),
   });
   const nameGenerator = new lambda.LayerVersion(this, 'NameGeneratorLayer', {
     code: lambda.Code.fromAsset('lambda-layers/nameGenerator'),
   });
   ```

7. Create "./lambda-fns/lambda.ts" to define lambda handler

   ```js
   const random_name = require('/opt/randomName');
   const axios = require('axios');
   exports.handler = async (event: any, context: any) => {
     const name = random_name.getName();
     const result = await axios.get(
       'https://jsonplaceholder.typicode.com/todos/1'
     );

     console.log('Random Name ==>', name);
     console.log('Random Fetch ==>', result.data);

     return {
       statusCode: 200,
       headers: { 'Content-Type': 'application/json' },
       body: {
         randomName: name,
         randomFetch: result.data,
       },
     };
   };
   ```

8.
