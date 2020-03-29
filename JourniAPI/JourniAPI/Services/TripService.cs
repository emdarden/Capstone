using System;
using System.Collections.Generic;
using JourniAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace JourniAPI.Services
{
    public class TripsService
    {
        private readonly IMongoCollection<Trip> _trips;

        public TripsService(IJourniDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.TripsCollectionName);

            _trips = database.GetCollection<Trip>(settings.TripsCollectionName);
        }

        public List<Trip> GetAllTrips(string userId) => _trips.Find(trip => true).ToList();


        public Trip GetTrip(string tripId) => _trips.Find(trip => trip.Id == tripId).FirstOrDefault();
        

        public Trip CreateTrip(Trip trip)
        {
            _trips.InsertOne(trip);
         
            return trip;
        }

        //public void Update(string id, User userIn) => _users.ReplaceOne(user => user.Id == id, userIn);

        public void UpdateTrip(Trip trip, string userId)
        {


        }

        public void RemoveTrip(string id) => _users.DeleteOne(user => user.Id == id);

    }
}
