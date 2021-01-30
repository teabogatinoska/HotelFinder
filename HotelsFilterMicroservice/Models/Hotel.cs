using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotelsFilterMicroservice.Models
{
    public class Hotel
    {
        public long id { get; set; }
        public string name_mk { get; set; }
        public string name_ang { get; set; }
        public int starsNum { get; set; }
        public double price { get; set; }
        public string image_url { get; set; }
        public bool breakfast_included { get; set; }
        public bool free_cancellation { get; set; }
        public bool swimming_pool { get; set; }
        public bool parking { get; set; }
        public bool wifi { get; set; }
        public bool smoking { get; set; }
        public bool disabled_guest { get; set; }
        public bool pets { get; set; }
        public double distance_center { get; set; }
        public double distance_airport { get; set; }
        public string street { get; set; }
        public long postcode { get; set; }
        public string city { get; set; }
        public string website { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
    }
}