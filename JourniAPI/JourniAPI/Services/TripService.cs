using System;
using System.Collections.Generic;
using System.Linq;
using JourniAPI.Models;
using MongoDB.Driver;

namespace JourniAPI.Services
{
    public class TripService
    {
        private readonly IMongoCollection<User> _users;
        private readonly UserService _userService;

        public TripService(IJourniDatabaseSettings settings, UserService userService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);

            _userService = userService;

        }

        public List<Trip> GetAllTrips(string userId)
        {
            User user = _userService.Get(userId);

            return user.Trips;
        }


        public Trip GetTrip(string userID, string tripName)
        {
            User user = _userService.Get(userID);

            Trip trip = user.Trips.Find(trip => trip.Name == tripName);

            return trip;
        }


        public Trip CreateTrip(string userID, Trip trip)
        {
            User user = _userService.Get(userID);

            user.Trips.Add(trip);

            _users.FindOneAndUpdate(
                user => user.User_ID == userID,
                Builders<User>.Update.Set("Trips", user.Trips));

            return trip;
        }

        public void RemoveTrip(string userID, string tripName)
        {
            User user = _userService.Get(userID);

            var item = user.Trips.Single(trip1 => trip1.Name == tripName);

            user.Trips.Remove(item);

            _users.FindOneAndUpdate(
                user => user.User_ID == userID,
                Builders<User>.Update.Set("Trips", user.Trips));
        }

        ////public void Update(string id, User userIn) => _users.ReplaceOne(user => user.Id == id, userIn);

        //public void UpdateTrip(Trip trip, string userId)
        //{


        //}



    }
}
