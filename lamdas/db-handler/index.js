var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();

exports.handler = (event, context, callback) => {
    var bodyText = event['body'];
    if (!bodyText) {
        callback('Missing body');
        return;
    }

    var body = JSON.parse(bodyText);
    if (!body) {
        callback('Invalid body response');
        return;
    }

    var feedbackText = body.feedback;
    var feedbackSentiment = body.sentiment;
    var feedbackDate = body.fdate;

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
            callback(err);
        } else {
            console.log("Success", data);
            callback(null, {
                statusCode: 200,
            });
        }
    });
};