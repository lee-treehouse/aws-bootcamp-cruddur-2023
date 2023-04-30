import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export const handler = async (event, context) => {
  const client = new S3Client({region: "ap-southeast-2"});

  const command = new PutObjectCommand({
    Bucket: process.env.UPLOADS_BUCKET_NAME,
    Key: "test.jpg",
  });

  const presignedURL = await getSignedUrl(client, command, {expiresIn: 60 * 5});

  return {url: presignedURL};
};
