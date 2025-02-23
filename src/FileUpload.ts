import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

s3upload();

async function s3upload() {
  if (process.argv.length !== 3) {
    console.log("Specify the file to upload on the command line");
    process.exit();
  }

  try {
    const client = new S3Client({ region: "us-east-1" });
    const filePath = process.argv[2];
    const fileContent = fs.readFileSync(filePath);
    const bucketName = "cdk-hnb659fds-assets-830528661272-us-east-1";
    const fileKey = filePath.split("/").pop(); //extract filename from path

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: fileContent,
    };

    const command = new PutObjectCommand(params);
    const response = await client.send(command);

    console.log("File upload successful with status code:", response.$metadata.httpStatusCode);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}