using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Entities
{
    public class Types
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Shared_Item> Shared_Items { get; set; } 
    }
}
