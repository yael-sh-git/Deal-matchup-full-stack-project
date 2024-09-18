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
    public class Key_WordService : IService<Key_WordDto>
    {
        private readonly IRepository<Key_Word> repository;
        private readonly IMapper mapper;

        public Key_WordService(IRepository<Key_Word> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<Key_WordDto> AddItem(Key_WordDto item)
        {
            return mapper.Map<Key_WordDto>(await repository.AddItem(mapper.Map<Key_Word>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<Key_WordDto>> GetAll()
        {
            return mapper.Map<List<Key_WordDto>>(await repository.getAll());
        }

        public async Task<Key_WordDto> GetById(int id)
        {
            return mapper.Map<Key_WordDto>(await repository.getById(id));
        }

        public async Task UpdateItem(Key_WordDto item, int id)
        {
            await repository.UpdateItem(mapper.Map<Key_Word>(item),id);
        }
    }
}
