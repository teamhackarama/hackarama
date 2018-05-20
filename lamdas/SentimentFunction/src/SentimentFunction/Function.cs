using System;
using System.IO;
using Newtonsoft.Json;

using Amazon.Lambda.Core;
using Amazon.Lambda;
using Amazon.Lambda.Model;
using Amazon;
using Microsoft.ML.Runtime.Api;
using Microsoft.ML;
using System.Net.Http;
using System.Text;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace SentimentFunction
{
    public class SentimentData
    {
        [Column(ordinal: "0")]
        public string SentimentText;
        [Column(ordinal: "1", name: "Label")]
        public float Sentiment;
    }

    public class SentimentPrediction
    {
        [ColumnName("PredictedLabel")]
        public bool Sentiment;
    }

    public class Function
    {
        const string modelPath = @".\models\imdb_trained";

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public string FunctionHandler(string input, ILambdaContext context)
        {
            PredictionModel<SentimentData, SentimentPrediction> model =
                PredictionModel.ReadAsync<SentimentData, SentimentPrediction>(modelPath).Result;

            SentimentData data = new SentimentData
            {
                SentimentText = input,
                Sentiment = 0
            };
            SentimentPrediction prediction = model.Predict(data);

            DynamoDbSchema schematizedPrediction = new DynamoDbSchema
            {
                Feedback = input,
                Date = DateTime.UtcNow.ToString("MM/dd/yy"),
                Sentiment = prediction.Sentiment ? "positive" : "negative"
            };

            string serializedPrediction = JsonConvert.SerializeObject(schematizedPrediction);
            string response = PostPredictionViaHttp(serializedPrediction);

            return response;
            // return PostPredicitionViaInvokeRequest(serializedPrediction);
        }

        private static string PostPredicitionViaInvokeRequest(string serializedPrediction)
        {
            AmazonLambdaClient client = new AmazonLambdaClient("awsaccessKeyID", "awsSecreteAccessKey", RegionEndpoint.USWest1);

            InvokeRequest ir = new InvokeRequest
            {
                FunctionName = "HelloLambdaWorld",
                InvocationType = InvocationType.RequestResponse,
                Payload = "\"Vikram\""
            };

            InvokeResponse response = null; // client.Invoke(ir);

            var sr = new StreamReader(response.Payload);
            JsonReader reader = new JsonTextReader(sr);

            var serilizer = new JsonSerializer();
            var op = serilizer.Deserialize(reader);

            Console.WriteLine(op);
            Console.ReadLine();

            return serializedPrediction;
        }

        private static string PostPredictionViaHttp(string input)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, "https://pt8ktrp8sb.execute-api.us-east-1.amazonaws.com/prod/")
                {
                    Content = new StringContent(input, Encoding.UTF8, "application/json")
                };

                var response = client.SendAsync(request).Result;
                var content = response.Content.ReadAsStringAsync().Result;
                return content;
            }
        }
    }
}
