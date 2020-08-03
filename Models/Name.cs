using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace EplScores.Models
{
    public class Name
    {

        [BsonElement("display")]
        [Required(ErrorMessage = "Display name is required")]
        [MaxLength(100)]
        public string displayName { get; set; }

        [BsonElement("first")]
        public string firstName { get; set; }

        [BsonElement("middle")]
        public string middleName { get; set; }

        [BsonElement("last")]
        public string lastName { get; set; }
    }
}