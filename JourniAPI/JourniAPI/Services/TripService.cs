using System;
using JourniAPI.Models;
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

    }
}
