using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EplScores.Models
{
    public class Player
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }


        public Name name { get; set; }

        public string position { get; set; }


        [BsonElement("matchShirtNumber")]
        [Range(1, 99, ErrorMessage = "Shirt number has to be between including 1 and 99")]
        public int shirtNmuber { get; set; }

        [Required(ErrorMessage = "Birth date in millis is required")]
        public long birthDateMillis { get; set; }

        [Required(ErrorMessage = "Country name is required")]
        public string countryName { get; set; }

        [Required(ErrorMessage = "Country code is required")]
        public string countryCode { get; set; }
    }
}