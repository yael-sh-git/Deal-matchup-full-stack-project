using DealMatchup.Common.Entities;
using DealMatchup.Repository.Entities;
using DealMatchup.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DealMatchup.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Shared_ItemController : ControllerBase
    {
        private readonly IService_Shared_Item<Shared_ItemDto> service;

        public Shared_ItemController(IService_Shared_Item<Shared_ItemDto> service)
        {
            this.service = service;
        }

        // GET: api/<Shared_ItemController>
        [HttpGet]
        public async Task<List<Shared_ItemDto>> Get()
        {

            List<Shared_ItemDto> shared_items = await service.GetAll();
            shared_items.ForEach(p => GetPictures(p));
            return shared_items;
        }

        // GET api/<Shared_ItemController>/5
        [HttpGet("{id}")]
        public async Task<Shared_ItemDto> Get(int id)
        {
            Shared_ItemDto shared_item = await service.GetById(id);
            return GetPictures(shared_item);
        }

        // GET api/<Shared_ItemController>/category/{category}
        [HttpGet("category/{category}")]
        public async Task<List<Shared_ItemDto>> GetByCategory(int category)
        {
            List<Shared_ItemDto> shared_Items = new List<Shared_ItemDto>();
            await service.GetByCategory(category,shared_Items);
            shared_Items.ForEach(p => GetPictures(p));
            return shared_Items;
        }
        // GET api/<Shared_ItemController>/category/{category}
        [HttpGet("byDescription/{description}")]
        public async Task<List<Shared_ItemDto>> GetByDescription(string description)
        {
            List<Shared_ItemDto> shared_items = await service.GetByDescription(description);
            shared_items.ForEach(p => GetPictures(p));
            return shared_items; 
        }


        // POST api/<Shared_ItemController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromForm] Shared_ItemDto shared_Item)
        {
            if(shared_Item == null)
                return NotFound("shared_Item data is required!");
             
            if(shared_Item.Images != null)
            {
                List<string> imageUrls = new List<string>();

                foreach (var item in shared_Item.Images)
                {
                    if (item.FileName == null || item.FileName.Length == 0)
                        return Content("File not selected");
                    var path = Path.Combine(Environment.CurrentDirectory, "Images/", item.FileName /*+ "_" + DateTime.Now*/);
                    using (FileStream fs = new FileStream(path, FileMode.Create))
                    {
                        await item.CopyToAsync(fs);
                        fs.Close();
                    }
                    imageUrls.Add(item.FileName);
                }
                shared_Item.ImageUrl = string.Join(",", imageUrls);
            }

            return Ok(await service.AddItem(shared_Item));

        }

        [HttpGet("{id}/picture")]
        public Shared_ItemDto GetPictures(Shared_ItemDto shared_item)
        {
            shared_item.PicturesBytes = new List<byte[]>();
            if (shared_item != null&& shared_item.ImageUrl!=null)
            {
                string[] urls = shared_item.ImageUrl.Split(',');
                foreach (var item in urls)
                {
                    var filePath = Path.Combine(Environment.CurrentDirectory, "Images", item);
                    //var filePath = Path.Combine(Directory.GetCurrentDirectory(), item);
                    bool isExists = System.IO.File.Exists(filePath);
                    if (!isExists)
                    {
                        continue;
                    }

                    var fileBytes = System.IO.File.ReadAllBytes(filePath);
                    shared_item.PicturesBytes.Add(fileBytes);
                }
            }
            return shared_item;
        }


        // PUT api/<Shared_ItemController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] Shared_ItemDto shared_Item)
        {
            await service.UpdateItem(shared_Item, id);    
        }

        // DELETE api/<Shared_ItemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
