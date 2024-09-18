using DealMatchup.Repository.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Interfaces
{
    public interface IContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Shared_Item> SharedItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Types> Types { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Key_Word> Key_Words { get; set; }
        public DbSet<History> History { get; set; }
        public Task SaveChanges();

    }
}
