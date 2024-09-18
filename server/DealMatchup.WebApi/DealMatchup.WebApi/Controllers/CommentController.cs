using DealMatchup.Common.Entities;
using DealMatchup.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DealMatchup.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IService<CommentDto> service;

        public CommentController(IService<CommentDto> service)
        {
            this.service = service;
        }

        // GET: api/<CommentController>
        [HttpGet]
        public Task<List<CommentDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public Task<CommentDto> Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<CommentController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CommentDto comment)
        {
            if(comment == null)
                return NotFound("comment cannt add...");
            return Ok(await service.AddItem(comment));

        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CommentDto comment)
        {
            service.UpdateItem(comment,id);
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
