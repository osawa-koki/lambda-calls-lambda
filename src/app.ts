import {
  type APIGatewayEvent,
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult,
  type Context
} from 'aws-lambda'
import { LambdaClient, InvokeCommand, InvokeCommandInput } from '@aws-sdk/client-lambda'
import dotenv from 'dotenv'

import getUuid from './utils/getUuid'

dotenv.config()

const { LAMBDA_ADD_FUNCTION_NAME: lambdaAddFunctionName } = process.env

if (lambdaAddFunctionName == null) throw new Error('LAMBDA_ADD_FUNCTION_NAME is not defined')

export const lambdaHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const lambdaClient = new LambdaClient({})
  const params: InvokeCommandInput = {
    FunctionName: lambdaAddFunctionName,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({ message: 'InvokeCommandInputPayloadMessage' })
  }
  const command = new InvokeCommand(params)
  const response = await lambdaClient.send(command)
  const payload = response.Payload
  const payloadString = JSON.parse(payload?.transformToString() ?? '{}')
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'LambdaHandlerMessage',
      event: JSON.stringify(event, null, 2),
      context: JSON.stringify(context, null, 2),
      uuid: getUuid(),
      response: JSON.stringify(payloadString, null, 2)
    })
  }
}

export const addHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'AddHandlerMessage',
      event: JSON.stringify(event, null, 2),
      context: JSON.stringify(context, null, 2),
      uuid: getUuid()
    })
  }
}
