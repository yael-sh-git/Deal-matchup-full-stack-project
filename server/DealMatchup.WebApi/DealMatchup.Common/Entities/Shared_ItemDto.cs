
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DealMatchup.Common.Entities
{
    public class Shared_ItemDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }

        public int User_Id { get; set; }
        public int? Category_Id { get; set; }
        public int Type_Id { get; set; }
        public string Description { get; set; }
        public string? ImageUrl { get; set; }
        public ICollection<IFormFile>? Images { get; set; }
        public List<Byte[]>? PicturesBytes { get; set; }
        public string? Url { get; set; }
        public int? Rating { get; set; }
        public DateTime Date_of_sharing { get; set; }
        public virtual ICollection<CommentDto>? Comments { get; set; }

    }
}
