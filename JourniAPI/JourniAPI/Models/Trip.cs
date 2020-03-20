using System;
namespace JourniAPI.Models
{
    public class Trip
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Activity[] Activites;

        public Trip()
        {
        }
    }
}
