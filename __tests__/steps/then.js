require("dotenv").config();
const AWS = require("aws-sdk");

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

module.exports = {
  user_exists_in_UsersTable,
};
