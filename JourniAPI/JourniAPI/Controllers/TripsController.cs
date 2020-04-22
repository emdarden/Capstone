using System;
using JourniAPI.Services;
using JourniAPI.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using MongoDB.Bson;

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
        [HttpGet("{tripId}")]
        public ActionResult<Trip> GetTrip(string tripId)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return _tripService.GetTrip(id, _id);
        }

        [Authorize]
        [HttpPost("{trip._id}")]
        public ActionResult<Trip> CreateTrip(Trip trip)
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Ok(_tripService.CreateTrip(id, trip));
        }

        [Authorize]
        [HttpDelete("{tripId}")]
        public IActionResult RemoveTrip(string tripId)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _tripService.RemoveTrip(id, _id);
            return NoContent();
        }

    }
}
