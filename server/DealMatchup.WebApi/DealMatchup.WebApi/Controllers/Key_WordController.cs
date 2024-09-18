using DealMatchup.Common.Entities;
using DealMatchup.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DealMatchup.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Key_WordController : ControllerBase
    {
        private readonly IService<Key_WordDto> service;

        public Key_WordController(IService<Key_WordDto> service)
        {
            this.service = service;
        }

        // GET: api/<Key_WordController>
        [HttpGet]
        public Task<List<Key_WordDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<Key_WordController>/5
        [HttpGet("{id}")]
        public Task<Key_WordDto> Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<Key_WordController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Key_WordDto key_Word)
        {
            if(key_Word == null)
                return NotFound("key_word cannt add...");
            return Ok(await service.AddItem(key_Word));
        }

        // PUT api/<Key_WordController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Key_WordDto key_Word)
        {
            service.UpdateItem(key_Word,id);
        }

        // DELETE api/<Key_WordController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
