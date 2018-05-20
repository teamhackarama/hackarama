using Newtonsoft.Json;

namespace SentimentFunction
{
    public class DynamoDbSchema
    {
        [JsonProperty("sentiment")]
        public string Sentiment { get; set; }

        [JsonProperty("fdate")]
        public string Date { get; set; }

        [JsonProperty("feedback")]
        public string Feedback { get; set; }
    }
}
