using System;
using System.Collections.Generic;
using System.Linq;
using JourniAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace JourniAPI.Services
{
    public class DayService
    {
        private readonly IMongoCollection<User> _users;
        private readonly TripService _tripService;

        public DayService(IJourniDatabaseSettings settings, TripService tripService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);

            _tripService = tripService;
        }

        public List<Day> GetAllDays(string userId, ObjectId tripId)
        {
            Trip trip = _tripService.GetTrip(userId, tripId);

            return trip.Days;
        }

        public Day GetDay(string userId, ObjectId tripId, int day)
        {
            Trip trip = _tripService.GetTrip(userId, tripId);

            return trip.Days[day];
        }

        public List<Day> AddDay(string userId, ObjectId tripId)
        {
            Trip trip = _tripService.GetTrip(userId, tripId);

            trip.Days.Add(new Day());

            //updating nested object sucks
            _users.FindOneAndUpdate(
                user => user.User_ID == userId && user.Trips.Any(trip => trip._id == tripId),
                Builders<User>.Update.Set(user => user.Trips[-1].Days, trip.Days)
             );

            return trip.Days;
        }

        public List<Day> UpdateDays(string userId, ObjectId tripId, List<Day> days)
        {
            Trip trip = _tripService.GetTrip(userId, tripId);

            trip.Days = days;

            //updating nested object sucks

            _users.FindOneAndUpdate(
                user => user.User_ID == userId && user.Trips.Any(trip => trip._id == tripId),
                Builders<User>.Update.Set(user => user.Trips[-1].Days, trip.Days)
             );

            return days;
        }

        public void RemoveDay(string userId, ObjectId tripId)
        {
            Trip trip = _tripService.GetTrip(userId, tripId);

            int currentDays = trip.Days.Count;

            int endIndex = currentDays - 1;

            trip.Days[0].Places.AddRange(trip.Days[endIndex].Places);

            trip.Days.RemoveAt(endIndex);

            //updating nested object still sucks

            _users.FindOneAndUpdate(
                user => user.User_ID == userId && user.Trips.Any(trip => trip._id == tripId),
                Builders<User>.Update.Set(user => user.Trips[-1].Days, trip.Days)
             );


        }
    }
}
