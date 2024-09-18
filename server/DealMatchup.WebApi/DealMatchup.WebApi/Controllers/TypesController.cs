using DealMatchup.Common.Entities;
using DealMatchup.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DealMatchup.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypesController : ControllerBase
    {
        private readonly IService<TypesDto> service;

        public TypesController(IService<TypesDto> service)
        {
            this.service = service;
        }

        // GET: api/<TypesController>
        [HttpGet]
        public Task<List<TypesDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<TypesController>/5
        [HttpGet("{id}")]
        public Task<TypesDto> Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<TypesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TypesDto type)
        {
            if(type == null)
                return NotFound("type cannt add...");
            return Ok(await service.AddItem(type));
        }

        // PUT api/<TypesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] TypesDto type)
        {
            service.UpdateItem(type,id);
        }

        // DELETE api/<TypesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
