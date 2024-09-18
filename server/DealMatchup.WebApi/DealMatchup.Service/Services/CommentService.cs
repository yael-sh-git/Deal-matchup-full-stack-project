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
    public class CommentService : IService<CommentDto>
    {
        private readonly IRepository<Comment> repository;
        private readonly IMapper mapper;

        public CommentService(IRepository<Comment> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<CommentDto> AddItem(CommentDto item)
        {
            return mapper.Map<CommentDto>(await repository.AddItem(mapper.Map<Comment>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<CommentDto>> GetAll()
        {
            return mapper.Map<List<CommentDto>>(await repository.getAll());
        }

        public async Task<CommentDto> GetById(int id)
        {
            return mapper.Map<CommentDto>(await repository.getById(id));
        }

        public async Task UpdateItem(CommentDto item, int id)
        {
            await repository.UpdateItem(mapper.Map<Comment>(item),id);
        }
    }
}
