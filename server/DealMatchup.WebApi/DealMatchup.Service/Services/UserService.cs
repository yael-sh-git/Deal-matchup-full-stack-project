using AutoMapper;
using DealMatchup.Common.Entities;
using DealMatchup.Repository.Entities;
using DealMatchup.Repository.Interfaces;
using DealMatchup.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service.Services
{
    public class UserService:ILoginService<UserDto>
    {
        private readonly ILoginRepository<User> repository;
        private readonly IMapper mapper;

        public UserService(ILoginRepository<User> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<UserDto> AddItem(UserDto item)
        {
            return mapper.Map<UserDto>(await repository.AddItem(mapper.Map<User>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<UserDto>> GetAll()
        {
            return mapper.Map<List<UserDto>>(await repository.getAll());
        }

        public async Task<UserDto> GetById(int id)
        {
            return mapper.Map<UserDto>(await repository.getById(id));
        }
        public async Task<UserDto> Login(string email, string password)
        {
            return mapper.Map<UserDto>(await repository.Login(email, password));
        }

        public async Task UpdateItem(UserDto item, int id)
        {
            await repository.UpdateItem(mapper.Map<User>(item),id);
        }
    }
}
