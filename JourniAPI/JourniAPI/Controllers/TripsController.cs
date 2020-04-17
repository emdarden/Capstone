using System;
using JourniAPI.Services;
using JourniAPI.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

        [Authorize]
        [HttpGet]
        public ActionResult<List<Trip>> GetAllTrips()
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return _tripService.GetAllTrips(id);
        }

        [Authorize]
        [HttpGet("{tripName}")]
        public ActionResult<Trip> GetTrip(string tripName)
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return _tripService.GetTrip(id, tripName);
        }

        [Authorize]
        [HttpPost("{trip.tripName}")]
        public ActionResult<Trip> CreateTrip(Trip trip)
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Ok(_tripService.CreateTrip(id, trip));
        }

        [Authorize]
        [HttpDelete("{trip.tripName}")]
        public IActionResult RemoveTrip(string tripName)
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _tripService.RemoveTrip(id, tripName);
            return NoContent();
        }

    }
}
