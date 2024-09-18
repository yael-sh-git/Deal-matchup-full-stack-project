using DealMatchup.Repository.Entities;
using DealMatchup.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Repositories
{
    public class TypesRepository : IRepository<Types>
    {
        private readonly IContext _context;

        public TypesRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Types> AddItem(Types item)
        {
            await _context.Types.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Types.Remove(_context.Types.FirstOrDefault(x=> x.Id==id));
            await _context.SaveChanges();
        }

        public async Task<List<Types>> getAll()
        {
            return await _context.Types.ToListAsync();
        }

        public async Task<Types> getById(int id)
        {
            return await _context.Types.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(Types item, int id)
        {
            Types t = await getById(id);
            if(t != null)
            {
                t.Name = item.Name;
                _context.SaveChanges();
            }
        }
    }
}
