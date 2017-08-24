using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReporteJSPDF.Models
{
    public class OrderDetailsViewModel
    {
        public int OrderID { get; set; }
        public string Producto { get; set; }
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }
        public string Categoria { get; set; }
    }
}