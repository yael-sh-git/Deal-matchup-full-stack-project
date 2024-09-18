using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Entities
{
    public class Key_Word
    {
        [Key]
        public int Key_Id { get; set; }
        [Required]
        public string Key_Name { get; set; }
        [ForeignKey("Category")]
        public int Category_Id { get; set; }
        public  Category Category { get; set; }
        public int Num_Occurs { get; set; }

    }
}
