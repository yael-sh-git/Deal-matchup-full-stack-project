using DealMatchup.Common.Entities;
using DealMatchup.Repository.Entities;
using DealMatchup.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DealMatchup.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IService<HistoryDto> service;

        public HistoryController(IService<HistoryDto> service)
        {
            this.service = service;
        }

        // GET: api/<HistoryController>
        [HttpGet]
        public Task<List<HistoryDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<HistoryController>/5
        [HttpGet("{id}")]
        public Task<HistoryDto> Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<HistoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] HistoryDto history)
        {
            if (history == null)
            {
                return NotFound("History cannt add...");
            }
            return Ok(await service.AddItem(history));
        }

        // PUT api/<HistoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] HistoryDto history)
        {
            service.UpdateItem(history, id);
        }

        // DELETE api/<HistoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
