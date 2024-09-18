using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Common.Entities
{
    public class CommentDto
    {
        public int? Id { get; set; }
        public int User_Id { get; set; }
        public int Shared_Item_Id { get; set; }
        public string Description { get; set; }
        public DateTime Date_of_sharing { get; set; }
    }
}
