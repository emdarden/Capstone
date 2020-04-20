using System;
using System.Collections.Generic;
using System.Linq;
using JourniAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace JourniAPI.Services
{
    public class PlaceService
    {
        private readonly IMongoCollection<User> _users;
        private readonly DayService _dayService;
        private readonly UserService _userService;

        public PlaceService(IJourniDatabaseSettings settings, DayService dayService, UserService userService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);

            _dayService = dayService;
            _userService = userService;
        }

        public Day AddPlace(string userId, ObjectId tripId, Place place)
        {
            Day day = _dayService.GetDay(userId, tripId, 0);
            day.Places.Add(place);

            _users.FindOneAndUpdate(
                user => user.User_ID == userId && user.Trips.Any(trip => trip._id == tripId),
                Builders<User>.Update.Set(user => user.Trips[-1].Days[0], day)
             );

            User user = _userService.Get(userId);

            user.Places.Add(place.PlaceId);


            _users.FindOneAndUpdate(
               user => user.User_ID == userId,
               Builders<User>.Update.Set("Places", user.Places));

            return day;
        }

        public Day RemovePlace(string userId, string placeId)
        {


            List<Trip> trips = _userService.Get(userId).Trips;

            Trip trip = trips.Find(t => t.Days.Exists(d => d.Places.Exists(p => p.PlaceId == placeId)));

            List<Day> days = _dayService.GetAllDays(userId, trip._id);

            int day = days.FindIndex(d => d.Places.Exists(p => p.PlaceId == placeId));

            Day day2 = _dayService.GetDay(userId, trip._id, day);

            var placeToRemove = day2.Places.Single(place1 => place1.PlaceId == placeId);

            day2.Places.Remove(placeToRemove);

            _users.FindOneAndUpdate(
                user => user.User_ID == userId && user.Trips.Any(t => t._id == trip._id),
                Builders<User>.Update.Set(user => user.Trips[-1].Days[day], day2)
             );

            User user = _userService.Get(userId);

            var placeToRemove2 = user.Places.Single(place => place == placeId);

            user.Places.Remove(placeToRemove2);


            _users.FindOneAndUpdate(
               user => user.User_ID == userId,
               Builders<User>.Update.Set("Places", user.Places));

            return day2;

        }

        public List<string> GetAllPlaces(string userId) => _userService.Get(userId).Places;
    }
}
