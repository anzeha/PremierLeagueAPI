using System.Numerics;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using EplScores.Models;
using MongoDB.Driver;
using EplScores.Controllers;

namespace EplScores.Services
{
    public class PlayerService
    {
        private readonly IMongoCollection<Player> _players;

        public PlayerService(IEplDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _players = database.GetCollection<Player>(settings.PlayersCollectionName);
        }

        public async Task<IEnumerable<Player>> GetAll(PaginationParams paginationParams)
        {
            return await _players.Find(p => true).Skip((paginationParams.pageNumber - 1) * paginationParams.pageSize).Limit(paginationParams.pageSize).ToListAsync();
        }

        public async Task<Player> GetById(string id)
        {
            var player = await _players.Find(player => player.Id == id).FirstOrDefaultAsync();
            return player;

        }

        public async Task Create(Player player)
        {
            await _players.InsertOneAsync(player);
        }

        public async Task Update(string id, Player player)
        {
            await _players.ReplaceOneAsync(player => player.Id == id, player);
        }

        public async Task Delete(string id)
        {
            await _players.DeleteOneAsync(player => player.Id == id);
        }
    }
}