using System;
using JourniAPI.Services;
using JourniAPI.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace JourniAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly TripService _tripService;
        
        public TripsController(TripService tripService)
        {
            _tripService = tripService;
        }

        [HttpGet]
        public ActionResult<List<Trip>> GetAllTrips(string id)
        {
            return _tripService.GetAllTrips(id);
        }


    }
}
