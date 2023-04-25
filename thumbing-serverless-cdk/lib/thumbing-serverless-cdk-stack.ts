import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import {Construct} from "constructs";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export class ThumbingServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucketName = process.env.THUMBING_BUCKET_NAME!;
    const functionPath = process.env.THUMBING_FUNCTION_PATH!;
    const folderInput = process.env.THUMBING_FOLDER_INPUT!;
    const folderOutput = process.env.THUMBING_FOLDER_OUTPUT!;

    const bucket = this.importBucket(bucketName);
    const lambdaFunc = this.createLambda(bucketName, functionPath, folderInput, folderOutput);
    this.createS3NotifyToLambda(folderInput, lambdaFunc, bucket);

    const s3ReadWritePolicy = this.createPolicyBucketAccess(bucket.bucketArn);
    lambdaFunc.addToRolePolicy(s3ReadWritePolicy);
  }

  createBucket(bucketName: string) {
    const bucket = new s3.Bucket(this, "AssetsBucket", {
      bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    return bucket;
  }

  importBucket(bucketName: string) {
    const bucket = s3.Bucket.fromBucketName(this, "AssetsBucket", bucketName);
    return bucket;
  }

  createLambda(
    bucketName: string,
    functionPath: string,
    folderInput: string,
    folderOutput: string
  ) {
    const myLambda = new lambda.Function(this, "ThumbingLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(functionPath),
      environment: {
        DEST_BUCKET_NAME: bucketName,
        FOLDER_INPUT: folderInput,
        FOLDER_OUTPUT: folderOutput,
        PROCESS_WIDTH: "512",
        PROCESS_HEIGHT: "512",
      },
    });
    return myLambda;
  }

  createS3NotifyToLambda(prefix: string, lambda: lambda.IFunction, bucket: s3.IBucket): void {
    const destination = new s3n.LambdaDestination(lambda);
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT,
      destination //,
      //{prefix: prefix} // folder to contain the original images
    );
  }

  createPolicyBucketAccess(bucketArn: string) {
    const s3ReadWritePolicy = new iam.PolicyStatement({
      actions: ["s3:GetObject", "s3:PutObject"],
      resources: [`${bucketArn}/*`],
    });
    return s3ReadWritePolicy;
  }
}
