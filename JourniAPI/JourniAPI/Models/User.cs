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
        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        //public string Id { get; set; }

        //[BsonElement("LastName")]
        //[JsonProperty("LastName")]
        //public string LastName { get; set; }

        //public string FirstName { get; set; }

        //public string Email { get; set; }

        //public string PasswordHash { get; set; }

        //public User()
        //{
        //}
    

        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public string User_ID { get; set; }
        public List<Trip> Trips { get; set; }
    }
}
