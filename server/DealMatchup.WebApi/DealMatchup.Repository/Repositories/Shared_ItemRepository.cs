using DealMatchup.Repository.Entities;
using DealMatchup.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Repositories
{
    public class Shared_ItemRepository : IRepository_Shared_Item<Shared_Item>
    {
        private readonly IContext _context;

        public Shared_ItemRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Shared_Item> AddItem(Shared_Item item)
        {
            await _context.SharedItems.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.SharedItems.Remove(_context.SharedItems.FirstOrDefault(x => x.Id == id));
            _context.SaveChanges();
        }

        public async Task<List<Shared_Item>> getAll()
        {
            return await _context.SharedItems.Include(s=> s.Comments).ToListAsync();
        }

        public async Task<Shared_Item> getById(int id)
        {
            return await _context.SharedItems.Include(u=> u.Comments).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Shared_Item>> getByCategory(int category_id)
        {
            return await _context.SharedItems.Include(u => u.Comments).Where(x => x.Category_Id == category_id).ToListAsync();
        }

        public async Task UpdateItem(Shared_Item item, int id)
        {
            Shared_Item shared_Item = await getById(id);
            if(shared_Item != null)
            {
                shared_Item.Name= item.Name;
                shared_Item.Description = item.Description;
                shared_Item.ImageUrl = item.ImageUrl;
                shared_Item.Url = item.Url;
                shared_Item.Rating = item.Rating;

                await _context.SaveChanges();
            }

        }
    }
}
