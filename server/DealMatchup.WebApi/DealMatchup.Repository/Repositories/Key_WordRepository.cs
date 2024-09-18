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
    public class Key_WordRepository : IRepository<Key_Word>
    {
        private readonly IContext _context;

        public Key_WordRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Key_Word> AddItem(Key_Word item)
        {
            await _context.Key_Words.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Key_Words.Remove(_context.Key_Words.FirstOrDefault(x=> x.Key_Id == id));
            await _context.SaveChanges();
        }

        public async Task<List<Key_Word>> getAll()
        {
            return await _context.Key_Words.ToListAsync();
        }

        public async Task<Key_Word> getById(int id)
        {
            return await _context.Key_Words.FirstOrDefaultAsync(x => x.Key_Id == id);
        }

        public async Task UpdateItem(Key_Word item, int id)
        {
            Key_Word key_Word = await getById(id);
            if(key_Word != null)
            {
                key_Word.Key_Name = item.Key_Name;
                key_Word.Num_Occurs=item.Num_Occurs;
                _context.SaveChanges();
            }
        }
    }
}
