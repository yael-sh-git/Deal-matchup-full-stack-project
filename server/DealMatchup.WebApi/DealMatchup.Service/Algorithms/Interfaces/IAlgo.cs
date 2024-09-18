using DealMatchup.Common.Entities;
using DealMatchup.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service.Algorithms.Interfaces
{
    public interface IAlgo
    {
        public Task<int> GetCategoryForSharedItem(Shared_ItemDto shared_Item);
        public Task<List<Shared_Item>> GetSharedItemForSearch(string description, List<Shared_Item> shared_Items);
    }
}
