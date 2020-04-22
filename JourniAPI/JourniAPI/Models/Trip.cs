using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JourniAPI.Models
{
    public class Trip
    {
        public ObjectId _id { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public List<Day> Days { get; set; }

        public Trip()
        {
            this._id = ObjectId.GenerateNewId();
            this.Days = new List<Day>(Enumerable.Repeat(new Day(), 6));
        }
    }
}
