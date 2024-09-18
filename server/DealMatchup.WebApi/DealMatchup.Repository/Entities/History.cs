﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Repository.Entities
{
    public class History
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public int User_Id { get; set; }
        public  User User { get; set; }
        [ForeignKey("Shared_Item")]
        public int Shared_Item_Id { get; set; }
        public Shared_Item Shared_Item { get; set; }
        public DateTime DateOpen { get; set; }
    }
}
