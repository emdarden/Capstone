using System;
using System.Collections.Generic;
using JourniAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace JourniAPI.Services
{
    public class TripsService
    {
        private readonly IMongoCollection<User> _users;

        public TripsService(IJourniDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.UsersCollectionName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public List<Trip> Get(string userId)
        {
            User user = _users.Find(user => user.Id == userId).FirstOrDefault();

            return user.Trips;
        }

        //public Trip Get(string userId, ObjectId tripId)
        //{
        //    User user = _users.Find(user => user.Id == userId).FirstOrDefault();

        //    return user.Trips.Find(trip => trip.TripId == tripId);

        //}

        public Trip Create(string userId, Trip trip)
        {
            User user = _users.Find(user => user.Id == userId).FirstOrDefault();

            user.Trips.Add(trip);
            return trip;
        }

        public void Update(string id, User userIn) => _users.ReplaceOne(user => user.Id == id, userIn);


        public void Remove(string id) => _users.DeleteOne(user => user.Id == id);

    }
}
