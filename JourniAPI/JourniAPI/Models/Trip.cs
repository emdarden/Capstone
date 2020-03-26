using System;
using System.Collections.Generic;
using MongoDB.Bson;

namespace JourniAPI.Models
{
    public class Trip
    {
        //public ObjectId TripId { get; set; }
        public string Name { get; set; }
        public List<Activity> Activities { get; set; } 

        public Trip()
        {
            //TripId = ObjectId.GenerateNewId();
        }
    }
}
