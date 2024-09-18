using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Common.Entities
{
    public class Key_WordDto
    {
        public int? Key_Id { get; set; }

        public string Key_Name { get; set; }
        public int Category_Id { get; set; }
        public int Num_Occurs { get; set; }
    }
}
