using DealMatchup.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service.Interfaces
{
    public interface IService_Shared_Item<T>:IService<T>
    {
        public Task<List<T>> GetByCategory(int category_id,List<Shared_ItemDto> shared_Items);
        public Task<List<Shared_ItemDto>> GetByDescription(string description);
    }
}
