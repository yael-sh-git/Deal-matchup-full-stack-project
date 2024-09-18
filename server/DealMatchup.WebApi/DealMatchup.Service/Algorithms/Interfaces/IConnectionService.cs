using DealMatchup.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service.Algorithms.Interfaces
{
    public interface IConnectionService
    {
        public Task<string> TranslateTextAsync(string text);
        public Task<List<(string, string)>> TagWordsAsync(string text);

        public Task<Category> ClassifySentence(List<Category> categories, string sentence);

    }
}
