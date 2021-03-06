using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using HotelPedia.Data;
using HotelPedia.Models;

namespace HotelPedia.Controllers
{
    public class HotelsController : Controller
    {
        private HotelPediaContext db = new HotelPediaContext();

        // GET: Hotels
        public ActionResult HotelPedia()
        {
            return View(db.Hotels.ToList());
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

        [HttpPost]
        public ActionResult HotelSearch(string text)
        {

            var selectedValue = Request.Form["ddlId"].ToString(); //this will get selected value
            ViewBag.Message = selectedValue;

            IEnumerable<Hotel> hotels = db.Hotels.ToList();


            switch (selectedValue)
            {
                case "1":
                    hotels = hotels.OrderByDescending(s => s.starsNum);
                    break;
                case "2":
                    hotels = hotels.OrderBy(s => s.starsNum);
                    break;
                case "3":
                    hotels = hotels.OrderBy(s => s.price);
                    break;
                case "4":
                    hotels = hotels.OrderByDescending(s => s.price);
                    break;
                case "5":
                    hotels = hotels.OrderBy(s => s.distance_center);
                    break;
                case "6":
                    hotels = hotels.OrderBy(s => s.distance_airport);
                    break;
                case "7":
                    hotels = hotels.OrderBy(s => s.name_ang);
                    break;
                default:
                    hotels = hotels.OrderBy(s => s.name_ang);
                    break;
            }

            ViewBag.MyList = hotels;


            return View(hotels);
        }



        public ActionResult Index()
        {
            return View(db.Hotels.ToList());
        }
        public ActionResult Discover()
        {
            return View(db.Hotels.ToList());
        }
        public ActionResult About()
        {
            return View(db.Hotels.ToList());
        }


        // GET: Hotels/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hotel hotel = db.Hotels.Find(id);
            if (hotel == null)
            {
                return HttpNotFound();
            }
            return View(hotel);
        }

        // GET: Hotels/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Hotels/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,name_mk,name_ang,starsNum,price,breakfast_included,free_cancellation,swimming_pool,parking,wifi,smoking,disabled_guest,pets,distance_center,distance_airport,street,postcode,city,website,email,phone")] Hotel hotel)
        {
            if (ModelState.IsValid)
            {
                db.Hotels.Add(hotel);
                db.SaveChanges();
                return RedirectToAction("HotelSearch");
            }

            return View(hotel);
        }

        // GET: Hotels/Edit/5
        public ActionResult Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hotel hotel = db.Hotels.Find(id);
            if (hotel == null)
            {
                return HttpNotFound();
            }
            return View(hotel);
        }

        // POST: Hotels/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,name_mk,name_ang,starsNum,price,breakfast_included,free_cancellation,swimming_pool,parking,wifi,smoking,disabled_guest,pets,distance_center,distance_airport,street,postcode,city,website,email,phone")] Hotel hotel)
        {
            if (ModelState.IsValid)
            {
                db.Entry(hotel).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("HotelSearch");
            }
            return View(hotel);
        }

        // GET: Hotels/Delete/5
        public ActionResult Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hotel hotel = db.Hotels.Find(id);
            if (hotel == null)
            {
                return HttpNotFound();
            }
            return View(hotel);
        }

        // POST: Hotels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(long id)
        {
            Hotel hotel = db.Hotels.Find(id);
            db.Hotels.Remove(hotel);
            db.SaveChanges();
            return RedirectToAction("HotelSearch");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
