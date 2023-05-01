import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {CognitoJwtVerifier} from "aws-jwt-verify";

const determineFileName = async (jwt, extension) => {
  const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.CLIENT_ID, //,
  });

  try {
    const payload = await jwtVerifier.verify(jwt);
    const uuid = payload.sub;
    return `${uuid}.${extension}`;
  } catch (err) {
    console.error("** Access forbidden:", err);
    return "user_not_recognized.jpg";
  }
};

export const handler = async (event, context) => {
  const client = new S3Client({region: "ap-southeast-2"});

  const body = JSON.parse(event.body);
  const extension = body.extension;

  console.log({extension});
  if (!extension);
  {
    console.log(body);
  }

  const jwt = event.headers.authorization.split(" ")[1];
  const fileName = await determineFileName(jwt, extension);

  const command = new PutObjectCommand({
    Bucket: process.env.UPLOADS_BUCKET_NAME,
    Key: fileName,
  });

  const presignedURL = await getSignedUrl(client, command, {expiresIn: 60 * 5});

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({url: presignedURL}),
  };
  return response;
};
