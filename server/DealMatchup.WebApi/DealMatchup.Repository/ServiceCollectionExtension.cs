using DealMatchup.Repository.Entities;
using DealMatchup.Repository.Interfaces;
using DealMatchup.Repository.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace DealMatchup.Repository
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection service)
        {
            service.AddScoped<ILoginRepository<User>, UserRepository>();
            service.AddScoped<IRepository_Shared_Item<Shared_Item>, Shared_ItemRepository>();
            service.AddScoped<IRepository<Types>, TypesRepository>();
            service.AddScoped<IRepository<Category>, CategoryRepository>();
            service.AddScoped<IRepository<Comment>, CommentRepository>();
            service.AddScoped<IRepository<Key_Word>, Key_WordRepository>();
            service.AddScoped<IRepository<History>, HistoryRepository>();
            return service;
        }
    }
}