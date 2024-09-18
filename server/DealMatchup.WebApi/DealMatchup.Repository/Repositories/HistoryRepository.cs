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
    public class HistoryRepository : IRepository<History>
    {
        private readonly IContext _context;

        public HistoryRepository(IContext context)
        {
            _context = context;
        }

        public async Task<History> AddItem(History item)
        {
            await _context.History.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.History.Remove(_context.History.FirstOrDefault(x => x.Id == id));
            _context.SaveChanges();
        }

        public async Task<List<History>> getAll()
        {
            return await _context.History.ToListAsync();
        }

        public async Task<History> getById(int id)
        {
            return await _context.History.FirstOrDefaultAsync(x=> x.Id==id);
        }

        public async Task UpdateItem(History item, int id)
        {
            History h= await getById(id);
            if (h!=null)
            {
                h.Id=item.Id;
                h.DateOpen=item.DateOpen;
                _context.SaveChanges();
            }
        }
    }
}
