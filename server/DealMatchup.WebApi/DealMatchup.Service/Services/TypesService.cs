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
    public class TypesService : IService<TypesDto>
    {
        private readonly IRepository<Types> repository;
        private readonly IMapper mapper;

        public TypesService(IRepository<Types> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<TypesDto> AddItem(TypesDto item)
        {
            return mapper.Map<TypesDto>(await repository.AddItem(mapper.Map<Types>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<TypesDto>> GetAll()
        {
            return mapper.Map<List<TypesDto>>( await repository.getAll());
        }

        public async Task<TypesDto> GetById(int id)
        {
            return mapper.Map<TypesDto>(await repository.getById(id));
        }

        public async Task UpdateItem(TypesDto item, int id)
        {
            await repository.UpdateItem(mapper.Map<Types>(item),id);
        }
    }
}
