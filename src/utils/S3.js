import AWS from "aws-sdk";

const S3 = new AWS.S3({
  signatureVersion: "v4",
  region: process.env.REACT_APP_AWS_S3_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, // YOUR AWS ACCESS KEY
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, // YOUR AWS SECRET ACCESS KEY
});

export default S3;
