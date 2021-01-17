require("dotenv").config();
const AWS = require("aws-sdk");
const http = require('axios');

const user_exists_in_UsersTable = async (id) => {
  const DynamoDB = new AWS.DynamoDB.DocumentClient();

  const resp = await DynamoDB.get({
    TableName: process.env.USERS_TABLE,
    Key: {
      id,
    },
  }).promise();
  console.log(`Response :: ${JSON.stringify(resp, undefined, 2)}`);
  expect(resp.Item).toBeTruthy();
  return resp.Item;
};

const user_can_upload_image_to_url = async (url, filePath, contentType) => {
  await http({
    method:'put',
    url,
    headers: {
      'Content-Type': contentType
    },
    data
  });

  console.log("uploaded image to", url);
};

const user_can_download_image_from_url = async (url) => {
  const resp = await http(url);
  console.log('downloaded image from ', url);
  return resp.data;
};

module.exports = {
  user_exists_in_UsersTable,
  user_can_upload_image_to_url,
  user_can_download_image_from_url
};
