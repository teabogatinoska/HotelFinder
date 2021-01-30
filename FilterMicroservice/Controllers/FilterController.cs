using FilterMicroservice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FilterMicroservice.Controllers
{
    public class FilterController : Controller
    {
        
        [System.Web.Http.HttpGet]
        public ActionResult HotelPedia()
        {
            return View();
        }


        [System.Web.Http.HttpPost]
        public ActionResult HotelPedia(string data)
        {

            //ViewBag["Message"] = data;

            //            return TempData["Message"].ToString();
            return View();
        }
        



        [System.Web.Http.HttpGet]
        public ActionResult HotelSearch()
        {
            //get the Json filepath  
            string fileJson = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/new_csvjson.json");

            //deserialize JSON from file  
            string json = System.IO.File.ReadAllText(fileJson);

            JavaScriptSerializer ser = new JavaScriptSerializer();
            var hotelList = ser.Deserialize<List<Hotel>>(json);


            return View(hotelList);
        }


    }
}
