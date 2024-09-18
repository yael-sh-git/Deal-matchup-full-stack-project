using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Rating { get; set; }
        public string Role { get; set; }
        public virtual ICollection<Shared_Item> Shared_Items { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<History> History { get; set; }

    }
}
