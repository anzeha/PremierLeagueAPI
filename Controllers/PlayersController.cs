
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using EplScores.Models;
using EplScores.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace EplScores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {

        private readonly PlayerService _playerService;

        public PlayersController(PlayerService playerService)
        {

            _playerService = playerService;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetAll([FromQuery] PaginationParams paginationParams)
        {
            var players = await _playerService.GetAll(paginationParams);
            return Ok(players);
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Player>> GetById(string id)
        {
            var player = await _playerService.GetById(id);
            if (player == null)
            {
                return NotFound(new { ErrorMessage = "Player with the provided id not found" });
            }
            else return Ok(player);
        }

        [HttpPost]
        public async Task<ActionResult<Player>> Create(Player player)
        {
            await _playerService.Create(player);
            return Ok(player);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult<Player>> Update(string id, Player updatedPlayer)
        {
            var player = await _playerService.GetById(id);
            if (player == null) return NotFound(new { ErrorMessage = "Player with the provided id not found" });
            try
            {
                await _playerService.Update(id, updatedPlayer);
                return updatedPlayer;
            }
            catch (Exception e)
            {
                return BadRequest(new { ErrorMessage = e.Message });
            }

        }

        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            var player = await GetById(id);
            try
            {
                await _playerService.Delete(id);
            }
            catch (Exception e)
            {
                BadRequest(new { ErrorMessage = e.Message });
            }
            return NoContent();
        }


    }
}