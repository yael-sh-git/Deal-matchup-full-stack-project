using AutoMapper;
using DealMatchup.Common.Entities;
using DealMatchup.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Types, TypesDto>().ReverseMap();
            CreateMap<Comment, CommentDto>().ReverseMap();
            CreateMap<Shared_Item, Shared_ItemDto>().ReverseMap();
            CreateMap<Key_Word, Key_WordDto>().ReverseMap();
            CreateMap<History, HistoryDto>().ReverseMap();
        }
    }
}
