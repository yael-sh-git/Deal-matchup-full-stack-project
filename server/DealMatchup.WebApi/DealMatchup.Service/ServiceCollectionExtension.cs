using DealMatchup.Common.Entities;
using DealMatchup.Repository;
using DealMatchup.Service.Algorithms.Implements;
using DealMatchup.Service.Algorithms.Interfaces;
using DealMatchup.Service.Interfaces;
using DealMatchup.Service.Services;
using Microsoft.Extensions.DependencyInjection;

namespace DealMatchup.Service
{
    public static class ServiceCollectionExtension
    {
        
        public static IServiceCollection AddServices(this IServiceCollection service)
        {
            service.AddRepositories();

            service.AddScoped<ILoginService<UserDto>, UserService>();
            service.AddScoped<IService<CategoryDto>, CategoryService>();
            service.AddScoped<IService<TypesDto>, TypesService>();
            service.AddScoped<IService<Key_WordDto>, Key_WordService>();
            service.AddScoped<IService<CommentDto>, CommentService>();
            service.AddScoped<IService_Shared_Item<Shared_ItemDto>, Shared_ItemService>();
            service.AddScoped<IService<HistoryDto>, HistoryService>();
            service.AddAutoMapper(typeof(MapperProfile));
            service.AddScoped<IAlgo, SharedItems_Algorithms>();
            service.AddScoped<IConnectionService, ConnectionService>();



            return service;
        }
        
    }
}