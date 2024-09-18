using DealMatchup.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Interfaces
{
    public interface ILoginRepository<T>:IRepository<User>
    {
        public Task<User> Login(string email, string password);
    }
}
