using System;
using System.Collections.Generic;
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
        [HttpGet]
        public ActionResult<List<string>> GetAllPlaces()
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return _placeService.GetAllPlaces(id);
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
        public ActionResult<Day> RemovePlace(string placeId)
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return _placeService.RemovePlace(id, placeId);
        }
    }
}
