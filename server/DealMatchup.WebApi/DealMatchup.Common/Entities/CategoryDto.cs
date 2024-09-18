using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Common.Entities
{
    public class CategoryDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int? Parent_CategoryId { get; set; }
    }
}
