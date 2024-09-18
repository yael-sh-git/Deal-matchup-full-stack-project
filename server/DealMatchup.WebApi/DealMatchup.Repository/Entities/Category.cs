using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("Category")]
        public int? Parent_CategoryId { get; set; }
        public  Category Parent_Category { get; set; }

        public virtual ICollection<Shared_Item> Shared_Items { get; set; }
        public virtual ICollection<Key_Word> Key_Words { get; set; } 

    }
}
