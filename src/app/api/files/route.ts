"use server";

import AWS from "aws-sdk";
import { NextResponse } from "next/server";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

const s3 = new AWS.S3();

export async function GET() {
  try {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: process.env.AWS_BUCKET_NAME!,
    };

    const data = await s3.listObjectsV2(params).promise();

    const files =
      data.Contents?.map((file) => ({
        key: file.Key,
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
        lastModified: file.LastModified,
        size: file.Size,
      })) || [];

    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error("Error fetching file list:", error);
    return NextResponse.json(
      { error: "Failed to fetch file list" },
      { status: 500 }
    );
  }
}
