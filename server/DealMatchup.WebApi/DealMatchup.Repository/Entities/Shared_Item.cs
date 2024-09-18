using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Entities
{
    public class Shared_Item
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("User")]
        public int User_Id { get; set; }
        public User User { get; set; }
        [ForeignKey("Category")]
        public int Category_Id { get; set; }
        public  Category Category { get; set; }
        [ForeignKey("Type")]
        public int Type_Id { get; set; }
        public Types Type { get; set; }
        public string Description { get; set; }
        public string? ImageUrl { get; set; }
        public string? Url { get; set; }
        public int Rating { get; set; }
        public DateTime Date_of_sharing { get; set; }

        public virtual ICollection<Comment> Comments { get; set; } 

    }
}
