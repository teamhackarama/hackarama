using System;
using Microsoft.ML.Models;
using Microsoft.ML.Runtime;
using Microsoft.ML.Runtime.Api;
using Microsoft.ML.Trainers;
using Microsoft.ML.Transforms;
using System.Collections.Generic;
using System.Linq;
using Microsoft.ML;
using System.IO;
using Newtonsoft.Json;
using System.Text;
using System.Text.RegularExpressions;

using Amazon.Lambda.Core;
using System.Diagnostics;

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
            string serializedPrediction = JsonConvert.SerializeObject(prediction);

            Console.WriteLine($"Predicition (console): {serializedPrediction}");
            Trace.WriteLine($"Predicition (trace): {serializedPrediction}");

            return serializedPrediction;
        }
    }
}
