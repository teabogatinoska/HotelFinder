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
/*
            if (TempData.ContainsKey("name"))
               // name = TempData["name"].ToString(); // returns "Bill" 

            if (ViewBag.ContainsKey("Message"))
                //Message = ViewBag["Message"].ToString(); // returns "Bill" 
*/

            return View(hotelList);
        }


        /*
        public ActionResult Index()
        {
            return View(db.Hotels.ToList());
        }
        */
        public ActionResult Discover()
        {
            return View();
        }
        public ActionResult ABOUT()
        {
            return View();
        }
        
        /*
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
        */
    }

}
