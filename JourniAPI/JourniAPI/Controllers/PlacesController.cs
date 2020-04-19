using System;
using System.Security.Claims;
using JourniAPI.Models;
using JourniAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace JourniAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly PlaceService _placeService;

        public PlacesController(PlaceService placeService)
        {
            _placeService = placeService;
        }

        [Authorize]
        [HttpPost("{place.PlaceId}")]
        public ActionResult<Day> AddPlace(string tripId, Place place)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return _placeService.AddPlace(id, _id, place);
        }

        [Authorize]
        [HttpDelete("{placeId}")]
        public ActionResult<Day> RemovePlace(string tripId, string placeId, int day)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return _placeService.RemovePlace(id, _id, placeId, day);
        }
    }
}
