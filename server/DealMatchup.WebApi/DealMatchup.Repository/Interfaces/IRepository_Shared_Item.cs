using DealMatchup.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Interfaces
{
    public interface IRepository_Shared_Item<T>:IRepository<T>
    {
        public Task<List<T>> getByCategory(int category_id);
    }
}
