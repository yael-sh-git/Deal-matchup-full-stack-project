using DealMatchup.Common.Entities;
using DealMatchup.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DealMatchup.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IService<CategoryDto> service;

        public CategoryController(IService<CategoryDto> service)
        {
            this.service = service;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public Task<List<CategoryDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Task<CategoryDto> Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryDto category)
        {
            if(category == null)
                return NotFound("Category canot add...");
            return Ok(await service.AddItem(category));
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CategoryDto category)
        {
            service.UpdateItem(category,id);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
