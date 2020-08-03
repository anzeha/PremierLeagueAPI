namespace EplScores.Models
{
    public class EplDatabaseSettings : IEplDatabaseSettings
    {
        public string MatchesCollectionName { get; set; }
        public string PlayersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IEplDatabaseSettings
    {
        string MatchesCollectionName { get; set; }
        string PlayersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}