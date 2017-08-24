using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ReporteJSPDF.Models;
using Newtonsoft.Json;

namespace ReporteJSPDF.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        ReporteEntities db = new ReporteEntities();

        public ActionResult Order()
        {
            List<Orders> data = db.Orders.Take(5).OrderByDescending(x => x.OrderID).ToList();
            ViewBag.List = new SelectList(data, "OrderID", "OrderID");
            return View(data);
        }

        public dynamic _OrderDetails(int ID)
        {
            List<Order_Details> data = new List<Order_Details>();

            db.Configuration.ProxyCreationEnabled = false;

            data = db.Order_Details.Include("Products").Where(x => x.OrderID == ID).ToList();

            return //Json(data);
            Newtonsoft.Json.JsonConvert.SerializeObject(data,
            Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
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