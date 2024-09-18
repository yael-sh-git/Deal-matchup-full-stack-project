using DealMatchup.Common.Entities;
using DealMatchup.Repository.Entities;
using DealMatchup.Repository.Interfaces;
using DealMatchup.Service.Algorithms.Interfaces;
using HtmlAgilityPack;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace DealMatchup.Service.Algorithms.Implements
{
    public class SharedItems_Algorithms : IAlgo
    {
        //private readonly IContext _context;
        private readonly IConnectionService connection_service;
        private readonly IRepository<Category> category_repository;
        private readonly IRepository<Key_Word> keyWord_repository;

        public enum PosTag
        {
            NOUN,
            ADJ,
            PROPN, 
            VERB
        }
        public SharedItems_Algorithms(IContext context, IConnectionService connectionService,IRepository<Category> category_repository, IRepository<Key_Word> keyWord_repository)
        {
            //_context = context;
            connection_service = connectionService;
            this.category_repository = category_repository;
            this.keyWord_repository = keyWord_repository;
        }

        private static (List<string>, List<string>) ExtractTagWordsToTags(List<(string, string)> extractedWordsList)
        {
            var nouns = new List<string>();
            var adjectivesAndVerbs = new List<string>();

            foreach (var tag_word in extractedWordsList)
            {
                // Extract word and its part-of-speech label
                var word = tag_word.Item1;
                var pos = tag_word.Item2;


                // Check if the word is an adjective or verb
                if (pos == PosTag.ADJ.ToString() || pos == PosTag.VERB.ToString())
                {
                    adjectivesAndVerbs.Add(word);
                }
                // Check if the word is a noun
                else if (pos == PosTag.NOUN.ToString() || pos == PosTag.PROPN.ToString())
                {
                    //לבדוק לגבי מה עם התארים - אם הוא לא מוצא את שם הקטגוריה
                    nouns.Add(word);
                    //adjectivesAndVerbs.Add(word);
                }
            }
            return (nouns, adjectivesAndVerbs);
        }

        

        async Task<List<Category>> FindSuitableCategory(List<string> nouns,List<string> adjectivesAndVerbs,List<Category> categories)
        {
            List<Category> matchCategories = new List<Category>();
            //אם אין שמות עצם וגם אין תאורים -מחזיר קטגוריית אחר 
            if (nouns == null && adjectivesAndVerbs==null)
                return categories.Where(c => c.Name == "other").ToList();
            // אם יש שמות עצם מחפש בשמות הקטגוריות תחילה
            if (nouns!= null)
                matchCategories = categories.Where(category => nouns.Contains(category.Name)).ToList();
            //אם אין לו שמות עצם- שיחפש מכל המוצרים רק את התארים
            //אם יש שמות עצם- ולא מצא בשמות הקטגוריות , מחפש ברשימת מילות מפתח
            if ( matchCategories.Count == 0)//matchCategories.Count > 1 ||
            {
                //אם המילות מפתח הם רק שמות עצם אז לבדוק איזה רשימה לשלוח לפונקציה
                //Category theMostSuitableCategory = categories.OrderByDescending(category => KeyWordsInCategory(category, nouns.Concat(adjectivesAndVerbs).ToList())).First();
                List<string> allKeywords;
                if (nouns == null && adjectivesAndVerbs != null)
                    allKeywords = adjectivesAndVerbs;
                else if (nouns != null && adjectivesAndVerbs == null)
                    allKeywords = nouns;
                else
                    allKeywords = nouns.Concat(adjectivesAndVerbs).ToList();
                matchCategories = categories.Where(category => KeyWordsInCategory(category, allKeywords)>0).OrderByDescending(category => KeyWordsInCategory(category, allKeywords)).ToList();
                //אם לא מצא - נוסיף לחיפוש גם את המילים הנרדפות של שמות העצם
                if(matchCategories.Count==0)
                {
                    matchCategories= await FindCategoriesBySynonyms(allKeywords, categories);
                    if(matchCategories.Count==0)
                        //לשנות לקטגורייה אחר
                        return categories.Where(c => c.Name == "other").ToList();
                }
            }
            return matchCategories;
        }

        int KeyWordsInCategory(Category category, List<string> keyWords)
        
        {
            int count = 0;
            if (category.Key_Words != null)
                foreach (var keyWord in keyWords)
                   foreach (Key_Word word in category.Key_Words)
                       if (word.Key_Name == keyWord)
                           count++;
            return count;
        }
        private async Task<List<Category>> FindCategoriesBySynonyms(List<string> nouns,List<Category> categories)
        {
            List<string> synonyms;
            List<Category> filterCategories=new List<Category>();
            List<Category> categoriesForNoun;
            Category category=new Category();
            foreach (var noun in nouns)
            {
                synonyms= GetSynonymsAsync(noun).Result;
                categoriesForNoun = categories.Where(category => synonyms.Any(s=> s.Contains(category.Name)) || synonyms.Any(s=>  category.Key_Words.Any(k=>  synonyms.Contains(k.Key_Name)))).ToList();
                
                if (categoriesForNoun.Count > 0)
                {
                    if (categoriesForNoun.Count > 1)
                        category = await connection_service.ClassifySentence(categoriesForNoun, noun);
                    else
                        category = categoriesForNoun.First();
                    filterCategories.Add(category);
                    AddKeyWordsToCategory(category, synonyms);
                }                    
            }
            return filterCategories;
        }
        private async void AddKeyWordsToCategory(Category category,List<string> synonyms)
        {
            Key_Word key_word;
            foreach (var synonym in synonyms)
            {
                key_word = new Key_Word() { Category_Id = category.Id, Key_Name = synonym };
                //לשנות להזרקת תלות של מילות מפתח רפוסיטורי
                await keyWord_repository.AddItem(key_word);
                //category.Key_Words.Add(key_word);
            }
        }

        private async Task<List<string>> GetSynonymsAsync(string word)
        {
            List<string> synonyms = new List<string>();
            string url = $"https://synonyms.reverso.net/%D7%9E%D7%9C%D7%99%D7%9D-%D7%A0%D7%A8%D7%93%D7%A4%D7%95%D7%AA/en/{word}";
            HttpClient client = new HttpClient();
            try
            {
                // שליחת בקשת GET לאתר
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                // קריאת תוכן התגובה
                string responseBody = await response.Content.ReadAsStringAsync();

                // פילוט התוכן באמצעות HtmlAgilityPack
                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(responseBody);
                // חיפוש אחר התגית שמכילה את רשימת המילים הדומות
                HtmlNode similars = doc.DocumentNode.SelectSingleNode("//ul[@class='word-box']"); // החיפוש שלך על פי Id
                if (similars != null)
                {
                    HtmlNodeCollection words = similars.SelectNodes(".//a[contains(@class, 'synonym')and contains(@class, 'relevant')]"); // החיפוש שלך על פי Id
                    if (words != null)
                    {
                        foreach (HtmlNode node in words)
                        {
                            string text = node.InnerText;
                            synonyms.Add(text);
                        }
                    }
                }
            }

            catch (HttpRequestException ex)
            {
                throw ex;
            }

            return synonyms;
        }
        

        public async Task<(List<Category>,List<string>)> GetCategoriesByDescription(string description,List<Category> allCategories)
        {

            string translatedText = await connection_service.TranslateTextAsync(description);
            // שליחת בקשת POST לשרת Flask על מנת לתייג מילות מפתח
            var taggedWords = await connection_service.TagWordsAsync(translatedText);
            var (nouns, adjectivesAndVerbs) = ExtractTagWordsToTags(taggedWords);
            List<Category> categories = await FindSuitableCategory(nouns, adjectivesAndVerbs,allCategories);


            return (categories,adjectivesAndVerbs);
        }

        public async Task<int> GetCategoryForSharedItem(Shared_ItemDto shared_Item)
        {
            var allCategories = await category_repository.getAll();
            (List<Category> categories, List<string> adjectivesAndVerbs) = await GetCategoriesByDescription(shared_Item.Description,allCategories);
            if(categories == null)
               return allCategories.Where(c=> c.Name=="other").ToList().First().Id;//קטגוריית אחר
            return categories.First().Id;
        }

        public async Task<(List<Category>,List<string>)> GetCategoriesForSearch(string description)
        {
            var allCategories = await category_repository.getAll();
            (List<Category> categories, List<string> adjectivesAndVerbs) = await GetCategoriesByDescription(description,allCategories);
            if (categories.Count == 1)
            {
                List<Category> subCategories = new List<Category>();
                AddSubcategories(categories.First(), allCategories, subCategories);
                subCategories.Add(categories.First());
                return (subCategories,adjectivesAndVerbs);
            }
            else
                return (categories,adjectivesAndVerbs);
        }

        public async Task<List<Shared_Item>> GetSharedItemForSearch(string description, List<Shared_Item> shared_Items)
        {
            (List<Category> categories,List<string> adjectivesAndVerbs) = await GetCategoriesForSearch(description);
            List<Shared_Item> filterSharedItems = new List<Shared_Item>();

            if(categories.Count==0)
                return filterSharedItems;
            var categoriesToProcess = categories.Where(c => c.Shared_Items != null && c.Shared_Items.Any());
            List<Shared_Item> allSharedItems = categoriesToProcess.SelectMany(c => c.Shared_Items).Distinct().ToList();
            if(adjectivesAndVerbs.Count == 0)
                return allSharedItems;
            filterSharedItems = allSharedItems;
            //filterSharedItems = allSharedItems.Where(sh => adjectivesAndVerbs.All(keyword => sh.Description.Contains(keyword))).ToList();

            return filterSharedItems;

        }

        private void AddSubcategories(Category category, List<Category> allCategories, List<Category> subcategories)
        {
            var directSubcategories = allCategories.Where(cat => cat.Parent_CategoryId == category.Id).ToList();
            subcategories.AddRange(directSubcategories);

            foreach (var subcategory in directSubcategories)
            {
                AddSubcategories(subcategory, allCategories, subcategories);
            }
        }
    }
}
