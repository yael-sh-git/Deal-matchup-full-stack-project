using DealMatchup.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service.Interfaces
{
    public interface ILoginService<T>: IService<UserDto>
    {
        public Task<UserDto> Login(string email, string password);
    }
}
