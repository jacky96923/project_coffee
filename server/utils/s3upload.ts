import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

if (
  !(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.S3_REGION &&
    process.env.S3_BUCKET_NAME
  )
) {
  throw new Error("env variables missing");
}

aws.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION,
});

export const s3 = new aws.S3();

export const bucketName = process.env.S3_BUCKET_NAME;
