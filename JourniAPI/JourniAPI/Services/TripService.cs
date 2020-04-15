using System;
using System.Collections.Generic;
using JourniAPI.Models;

namespace JourniAPI.Services
{
    public class TripService
    {
        //private readonly IMongoCollection<User> _users;
        private readonly UserService _userService;

        public TripService(UserService userService)
        {
            //var client = new MongoClient(settings.ConnectionString);
            //var database = client.GetDatabase(settings.DatabaseName);

            //_users = database.GetCollection<User>(settings.UsersCollectionName);
            _userService = userService;

        }

        public List<Trip> GetAllTrips(string userId)
        {
            User user = _userService.Get(userId);

            return user.Trips;
        }


        ////public Trip GetTrip(string tripId) => _trips.Find(trip => trip.Id == tripId).FirstOrDefault();


        ////public Trip CreateTrip(Trip trip)
        ////{
        ////    _trips.InsertOne(trip);

        ////    return trip;
        ////}

        ////public void Update(string id, User userIn) => _users.ReplaceOne(user => user.Id == id, userIn);

        //public void UpdateTrip(Trip trip, string userId)
        //{


        //}

        //public void RemoveTrip(string id) => _users.DeleteOne(user => user.Id == id);

    }
}
