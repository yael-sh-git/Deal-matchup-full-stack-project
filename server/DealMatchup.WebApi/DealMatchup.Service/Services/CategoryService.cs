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
    public class CategoryService : IService<CategoryDto>
    {
        private readonly IRepository<Category> repository;
        private readonly IMapper mapper;

        public CategoryService(IRepository<Category> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<CategoryDto> AddItem(CategoryDto item)
        {
            return mapper.Map<CategoryDto>(await repository.AddItem(mapper.Map<Category>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<CategoryDto>> GetAll()
        {
            return mapper.Map<List<CategoryDto>>(await repository.getAll());
        }

        public async Task<CategoryDto> GetById(int id)
        {
            return mapper.Map<CategoryDto>(await repository.getById(id));
        }

        public async Task UpdateItem(CategoryDto item, int id)
        {
            await repository.UpdateItem(mapper.Map<Category>(item),id);
        }
    }
}
