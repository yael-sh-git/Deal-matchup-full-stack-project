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
    public class CommentRepository : IRepository<Comment>
    {
        private readonly IContext _context;

        public CommentRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Comment> AddItem(Comment item)
        {
            await _context.Comments.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Comments.Remove(_context.Comments.FirstOrDefault(x => x.Id == id));
            await _context.SaveChanges();
        }

        public async Task<List<Comment>> getAll()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comment> getById(int id)
        {
            return await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(Comment item, int id)
        {
            Comment comment = await getById(id);
            if(comment != null)
            {
                comment.Description = item.Description;
                _context.SaveChanges();
            }
        }
    }
}
