using System;
using System.Collections.Generic;

namespace JourniAPI.Models
{
    public class Trip
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Activity> Activites { get; set; } 

        public Trip()
        {
        }
    }
}
