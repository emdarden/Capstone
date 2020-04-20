using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace JourniAPI.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        public string User_ID { get; set; }
        public List<Trip> Trips { get; set; }
        public List<string> Places { get; set; }

        public User()
        {

        }
    }
}
