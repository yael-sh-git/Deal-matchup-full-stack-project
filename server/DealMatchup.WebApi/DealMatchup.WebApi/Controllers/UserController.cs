using DealMatchup.Common.Entities;
using DealMatchup.Repository.Entities;
using DealMatchup.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace DealMatchup.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ILoginService<UserDto> service;
        public UserController(ILoginService<UserDto> service, IConfiguration configuration)
        {
            this.service = service;
            _configuration = configuration;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        [Authorize(Roles = "administrator")]
        public Task<List<UserDto>> Get()
        {
            return service.GetAll();
        }

        
        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        //[Authorize]
        public Task<UserDto> Get(int id)
        {
            return service.GetById(id);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            UserDto user = await service.Login(loginDto.Email, loginDto.Password);
            if (user != null)
            {
                List<Shared_ItemDto> shared_ItemDtos = new List<Shared_ItemDto>();
                shared_ItemDtos.AddRange(user.Shared_Items);
                shared_ItemDtos.ForEach(p => GetPictures(p));
                var authUser = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email,
                    password = user.Password,
                    rating = user.Rating,
                    role = user.Role,
                    shared_items= shared_ItemDtos,
                };

                var token = Generate(user);

                var response = new
                {
                    user = authUser,
                    token = token
                };

                string jsonString = JsonSerializer.Serialize(response, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });

                return Ok(jsonString);
            }
            return BadRequest("User not found");

        }
        [HttpGet("{id}/picture")]
        public Shared_ItemDto GetPictures(Shared_ItemDto shared_item)
        {
            shared_item.PicturesBytes = new List<byte[]>();
            if (shared_item != null && shared_item.ImageUrl != null)
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

        private string Generate(UserDto user)
        {
            //מפתח להצפנה
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            //אלגוריתם להצפנה
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(ClaimTypes.NameIdentifier,user.Name),
            new Claim(ClaimTypes.Email,user.Email),
            new Claim(ClaimTypes.Surname,user.Name),
            new Claim(ClaimTypes.Role,user.Role),
            new Claim(ClaimTypes.GivenName,user.Name)
            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserDto user)
        {
            if (user == null)
            {
                return NotFound("USER cannt add...");
            }
            try
            {
                var newUser = await service.AddItem(user);
                return Ok(newUser);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task Put(int id, [FromBody] UserDto user)
        {
            await service.UpdateItem(user, id);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }


    }
}
