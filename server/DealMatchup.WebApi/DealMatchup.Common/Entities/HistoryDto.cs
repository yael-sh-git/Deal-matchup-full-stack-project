using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Common.Entities
{
    public class HistoryDto
    {
        public int? Id { get; set; }
        public int User_Id { get; set; }
        public int Shared_Item_Id { get; set; }
        public DateTime DateOpen { get; set; }
    }
}
