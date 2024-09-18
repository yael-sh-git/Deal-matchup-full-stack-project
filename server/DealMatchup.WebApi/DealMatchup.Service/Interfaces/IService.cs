﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealMatchup.Service.Interfaces
{
    public interface IService<T>
    {
        public Task<T> GetById(int id);
        public Task<List<T>> GetAll();
        public Task<T> AddItem(T item);
        public Task UpdateItem(T item, int id);
        public Task DeleteItem(int id);
    }
}
