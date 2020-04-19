using System;
namespace JourniAPI.Models
{
    public class Place
    {
        public string PlaceId { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public Location Location { get; set; }

        public Place()
        {
        }
    }
}
