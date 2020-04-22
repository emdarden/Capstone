using System;
using System.Collections.Generic;

namespace JourniAPI.Models
{
    public class Day
    {
        public List<Place> Places { get; set; }
        public Day()
        {
            this.Places = new List<Place>();
        }
    }
}
