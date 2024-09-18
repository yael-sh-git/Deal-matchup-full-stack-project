using DealMatchup.Repository.Entities;
using DealMatchup.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DealMatchup.MockContext
{
    public class DealMatchupContext : DbContext, IContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Shared_Item> SharedItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Types> Types { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Key_Word> Key_Words { get; set; }
        public DbSet<History> History { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=(localdb)\\MSSQLLocaldb;database=DealMatchup;trusted_connection=true");
        }

        public async Task SaveChanges()
        {
            await SaveChangesAsync();
        }
    }
}