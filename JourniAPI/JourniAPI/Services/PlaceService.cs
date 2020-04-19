using System;
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

        public PlaceService(IJourniDatabaseSettings settings, TripService tripService, DayService dayService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);

            _dayService = dayService;
        }

        public Day AddPlace(string userId, ObjectId tripId, Place place)
        {
            Day day = _dayService.GetDay(userId, tripId, 0);
            day.Places.Add(place);

            _users.FindOneAndUpdate(
                user => user.User_ID == userId && user.Trips.Any(trip => trip._id == tripId),
                Builders<User>.Update.Set(user => user.Trips[-1].Days[0], day)
             );

            return day;
        }

        public Day RemovePlace(string userId, ObjectId tripId, string placeId, int day)
        {
            Day day2 = _dayService.GetDay(userId, tripId, day);

            var placeToRemove = day2.Places.Single(place1 => place1.PlaceId == placeId);

            day2.Places.Remove(placeToRemove);

            _users.FindOneAndUpdate(
                user => user.User_ID == userId && user.Trips.Any(trip => trip._id == tripId),
                Builders<User>.Update.Set(user => user.Trips[-1].Days[day], day2)
             );

            return day2;

        }
    }
}
