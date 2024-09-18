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
    public class CategoryRepository : IRepository<Category>
    {
        private readonly IContext _context;

        public CategoryRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Category> AddItem(Category item)
        {
            await _context.Categories.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Categories.Remove(_context.Categories.FirstOrDefault(c => c.Id == id));
            await _context.SaveChanges();
        }

        public async Task<List<Category>> getAll()
        {
            return await _context.Categories.Include(c=> c.Key_Words).Include(c=> c.Shared_Items).Where(c => c.Id != 0).ToListAsync();
        }

        public async Task<Category> getById(int id)
        {
            return await _context.Categories.Include(c => c.Key_Words).Include(c => c.Shared_Items).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(Category item, int id)
        {
            Category c = await getById(id);
            if(c != null)
            {
                c.Name = item.Name;
                _context.SaveChanges();
            }
        }
    }
}
