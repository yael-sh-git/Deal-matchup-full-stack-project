using AutoMapper;
using DealMatchup.Common.Entities;
using DealMatchup.Repository.Entities;
using DealMatchup.Repository.Interfaces;
using DealMatchup.Service.Algorithms.Interfaces;
using DealMatchup.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service.Services
{
    public class Shared_ItemService : IService_Shared_Item<Shared_ItemDto>
    {
        private readonly IRepository_Shared_Item<Shared_Item> repository;
        private readonly IRepository<Category> category_repository;
        private readonly IAlgo algo;
        private readonly IMapper mapper;

        public Shared_ItemService(IRepository_Shared_Item<Shared_Item> repository, IMapper mapper, IAlgo algo, IRepository<Category> category_repository)
        {
            this.repository = repository;
            this.mapper = mapper;
            this.algo = algo;
            this.category_repository = category_repository;
        }

        public async Task<Shared_ItemDto> AddItem(Shared_ItemDto item)
        {
            item.Category_Id = await algo.GetCategoryForSharedItem(item);
            return mapper.Map<Shared_ItemDto>(await repository.AddItem(mapper.Map<Shared_Item>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<Shared_ItemDto>> GetAll()
        {
            return mapper.Map<List<Shared_ItemDto>>(await repository.getAll());
        }

        public async Task<Shared_ItemDto> GetById(int id)
        {
            return mapper.Map<Shared_ItemDto>(await repository.getById(id));
        }
        public async Task<List<Shared_ItemDto>> GetByCategory(int id,List<Shared_ItemDto> shared_Items)
        {
            shared_Items.AddRange(mapper.Map<List<Shared_ItemDto>>(await repository.getByCategory(id)));

            List<Category> categories= category_repository.getAll().Result.Where(c=>c.Parent_CategoryId==id).ToList();

            foreach(Category category in categories)
            {
               await GetByCategory(category.Id,shared_Items);
            }
            return shared_Items;
        }
        public async Task<List<Shared_ItemDto>> GetByDescription(string description)
        {
            var items = await repository.getAll();
            return mapper.Map<List<Shared_ItemDto>>(await algo.GetSharedItemForSearch(description, items));
        }

        public async Task UpdateItem(Shared_ItemDto item, int id)
        {
            await repository.UpdateItem(mapper.Map<Shared_Item>(item),id);
        }
    }
}
