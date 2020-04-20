using System;
using System.Collections.Generic;
using System.Linq;
using JourniAPI.Models;
using MongoDB.Driver;

namespace JourniAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IJourniDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }


        public List<User> Get() => _users.Find(user => true).ToList();

        public User Get(string id) => _users.Find(user => user.User_ID == id).FirstOrDefault();

    }
}
