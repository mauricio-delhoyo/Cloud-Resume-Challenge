import boto3
import json
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('VisitorCount')

def increment_count():
   current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
   response = table.update_item(
      Key={'id': 'main',},
      AttributeUpdates={
         'visitor_count': {
            'Value': 1,
            'Action': 'ADD'
         },
         'last_visit': {
            'Value': current_time,
            'Action': 'PUT'
         }
      },
      ReturnValues="UPDATED_NEW"
   )
   return response

def lambda_handler(event, context):
    response = increment_count()
    # CORS is handled by API Gateway (Integration Response header mapping),
    # not here: with a non-proxy integration, headers returned by Lambda
    # are not sent to the browser.
    return {
        'statusCode': 200,
        'body': json.dumps({
            'visitor_count': str(response['Attributes']['visitor_count']),
            'last_visit': response['Attributes']['last_visit']
        })
    }
