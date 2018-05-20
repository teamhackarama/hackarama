var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();

exports.handler = (event, context, callback) => {
    var body = event['body'];
    var feedbackText = JSON.parse(body).feedback;

    var feedbackSentiment = JSON.parse(body).sentiment;

    var feedbackDate = JSON.parse(body).fdate;
    console.log(feedbackDate);

    var params = {
        TableName: 'NationwideFeedback',
        Item: {
            'FeedbackText': {
                S: feedbackText
            },
            'FeedbackSentiment': {
                S: feedbackSentiment
            },
            'FeedbackId': {
                S: (Math.floor(Math.random() * 1000000) + 1).toString()
            },
            'FeedbackDate': {
                S: feedbackDate
            },
            'FeedbackLocation': {
                S: 'Pizza Hut'
            }
        }
    };

    dynamodb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });

    var response = {
        statusCode: 200,

    };

    callback(null, response);
};