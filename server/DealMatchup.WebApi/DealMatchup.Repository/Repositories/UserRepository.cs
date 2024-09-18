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
    public class UserRepository : ILoginRepository<User>
    {
        private readonly IContext _context;

        public UserRepository(IContext context)
        {
            _context = context;
        }

        public async Task<User> AddItem(User item)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == item.Email);
            if (existingUser != null)
            {
                throw new Exception("User with this email already exists.");
            }
            await _context.Users.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Users.Remove(_context.Users.FirstOrDefault(x => x.Id == id));
            _context.SaveChanges();
        }

        public async Task<List<User>> getAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> getById(int id)
        {
            return await _context.Users.Include(u => u.Shared_Items).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<User> Login(string email, string password)
        {
            var user = _context.Users.Include(u => u.Shared_Items).FirstOrDefault(x => x.Email == email && x.Password == password);
            if (user != null)
            {

                return user;
            }
            return null;
        }

        public async Task UpdateItem(User item, int id)
        {
            User u= await getById(id);
            if(u!=null)
            {
                u.Name = item.Name;
                u.Email = item.Email;
                u.Password = item.Password;
                u.Rating = item.Rating;
                _context.SaveChanges();
            }
        }
    }
}
