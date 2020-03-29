using System;
using System.Collections.Generic;
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

        public User Get(string id) => _users.Find(user => user.Id == id).FirstOrDefault();

        //public List<Trip> GetTrips(string id) => this.Get(id).Trips;


        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void AddTrip(string id, Trip trip)
        {
            User user = this.Get(id);

            List<Trip> UserTrips = user.Trips;

            UserTrips.Add(trip);

            var filter = Builders<User>.Filter.Eq("Id", user.Id);
            var update = Builders<User>.Update.Set("Trips", UserTrips);

            _users.UpdateOne(filter, update);

        }

        public void RemoveTrip(string userId, string tripId)
        {

        }

        public void Update(string id, User userIn) => _users.ReplaceOne(user => user.Id == id, userIn);
      

        public void Remove(string id) => _users.DeleteOne(user => user.Id == id);
    }
}
