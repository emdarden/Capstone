using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JourniAPI.Models
{
    public class Trip
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public List<Place> Places { get; set; }

        public Trip()
        {
        }
    }
}
