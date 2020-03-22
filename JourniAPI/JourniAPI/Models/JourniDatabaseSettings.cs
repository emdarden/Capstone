using System;
namespace JourniAPI.Models
{
    public class JourniDatabaseSettings : IJourniDatabaseSettings
    {
        public string TripsCollectionName { get; set; }
        public string UsersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
       
    }

    public interface IJourniDatabaseSettings
    {
        string TripsCollectionName { get; set; }
        string UsersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
