using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using FilterHotelsMicroservice.Models;

namespace FilterHotelsMicroservice.Controllers
{
    public class FilterHotels : Controller
    {
        // GET: Sort
        public ActionResult Index()
        {
            return View();
        }
        //private HotelPediaContext db = new HotelPediaContext();

        // GET: Hotels

        [HttpGet]
        public ActionResult HotelPedia()
        {
            return View();
        }


        [HttpPost]
        public ActionResult HotelPedia(string data)
        {

            //ViewBag["Message"] = data;

            //            return TempData["Message"].ToString();
            return View();

        }



        [HttpGet]
        public ActionResult HotelSearch()
        {
            //get the Json filepath  
            string fileJson = Server.MapPath("~/App_Data/new_csvjson.json");

            //deserialize JSON from file  
            string json = System.IO.File.ReadAllText(fileJson);

            JavaScriptSerializer ser = new JavaScriptSerializer();
            var hotelList = ser.Deserialize<List<Hotel>>(json);


            return View(hotelList);
        }



        public ActionResult Discover()
        {
            return View();
        }
        public ActionResult ABOUT()
        {
            return View();
        }
    }
}