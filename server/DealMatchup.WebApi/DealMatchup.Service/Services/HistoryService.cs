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
    public class HistoryService : IService<HistoryDto>
    {
        private readonly IRepository<History> repository;
        private readonly IMapper mapper;

        public HistoryService(IRepository<History> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<HistoryDto> AddItem(HistoryDto item)
        {
            return mapper.Map<HistoryDto>(await repository.AddItem(mapper.Map<History>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<HistoryDto>> GetAll()
        {
            return mapper.Map<List<HistoryDto>>(await repository.getAll());
        }

        public async Task<HistoryDto> GetById(int id)
        {
            return mapper.Map<HistoryDto>(await repository.getById(id));
        }

        public async Task UpdateItem(HistoryDto item, int id)
        {
            await repository.UpdateItem(mapper.Map<History>(item),id);
        }
    }
}
