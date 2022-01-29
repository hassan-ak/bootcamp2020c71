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

8. Libraries to be used in lambda function can be stored seprately as lambda layer so create a new folder using `mkdir lambda-layers/http/nodejs` and navigate to this folder using `cd lambda-layers/http/nodejs`then initilize it as a npm project using `npm init --yes`. Install the required packages in this folder such as axios using `npm i axios`

9. Create "lambda-layers/nameGenerator/nodejs" and install npm package using `npm i node-random-name`
10. Create "./lambda-layers/nameGenerator/randomName.ts" to define a local layer

    ```js
    const randomName = require('node-random-name');
    exports.getName = () => {
      return randomName();
    };
    ```

11. Deploy the app using `cdk deploy`
12. Test using console
13. Destroy the app using `cdk destory`
