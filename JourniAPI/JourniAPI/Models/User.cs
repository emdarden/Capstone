﻿using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace JourniAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("LastName")]
        [JsonProperty("LastName")]
        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Email { get; set; }

        public List<Trip> Trips { get; set; }

        public User()
        {
        }
    }
}