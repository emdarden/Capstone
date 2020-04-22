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
    public class DaysController : ControllerBase
    {
        private readonly DayService _dayService;

        public DaysController(DayService dayService)
        {
            _dayService = dayService;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<Day>> GetAllDays(string tripId)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return _dayService.GetAllDays(id, _id);
        }

        [Authorize]
        [HttpGet("{day}")]
        public ActionResult<Day> GetDay(string tripId, int day)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return _dayService.GetDay(id, _id, day);
        }

        [Authorize]
        [HttpPost("{day}")]
        public ActionResult<List<Day>> AddDay(string tripId)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return _dayService.AddDay(id, _id);

        }

        [Authorize]
        [HttpPost]
        public ActionResult<List<Day>> UpdateDays(string tripId, List<Day> days)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return _dayService.UpdateDays(id, _id, days);
        }

        [Authorize]
        [HttpDelete("{day}")]
        public IActionResult RemoveDay(string tripId)
        {
            ObjectId _id = ObjectId.Parse(tripId);
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _dayService.RemoveDay(id, _id);
            return NoContent();
        }
    }
}
