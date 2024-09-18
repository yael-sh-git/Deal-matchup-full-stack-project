using DealMatchup.Repository.Entities;
using DealMatchup.Service.Algorithms.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service.Algorithms.Implements
{
    public class ConnectionService:IConnectionService
    {
        public async Task<string> TranslateTextAsync(string text)
        {
            using (var client = new HttpClient())
            {
                var requestData = new { text };
                var response = await client.PostAsync("http://127.0.0.1:5000/translate", new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json"));
                var responseData = await response.Content.ReadAsStringAsync();
                return Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseData).translated_text;
            }
        }

        public async Task<List<(string, string)>> TagWordsAsync(string text)
        {
            using (var client = new HttpClient())
            {
                var requestData = new { sentence = text };
                var response = await client.PostAsync("http://127.0.0.1:5000/tag-words", new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json"));
                var responseData = await response.Content.ReadAsStringAsync();

                // Convert the response directly to List<(string, string)>
                var taggedWords = Newtonsoft.Json.JsonConvert.DeserializeObject<List<List<string>>>(responseData)
                    .Select(pair => (pair[0], pair[1])).ToList();

                return taggedWords;
            }
        }

        public async Task<Category> ClassifySentence(List<Category> categories, string sentence)
        {
            var url = "http://127.0.0.1:5000/classify";
            var httpClient = new HttpClient();

            var requestData = new
            {
                categories = categories,
                sentence = sentence
            };

            var json = JsonConvert.SerializeObject(requestData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<Category>(responseContent);

            return result;
        }
    }
}
