var toType = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
}
/*Form search*/
$("#frm-report").submit(function () {
    var form = $(this);
    var total = 0;
    var subtotal;
    var columns = ["OrderID", "Producto", "Precio", "Cantidad", "Sub Total"];
    var row;
    var rows3 = [
        [11706, "Grandma's Boysenberry Spread", '25,00', '20', '500,00'],
        [11706, "Tofu", "23,25", '10', '232,50'],
        [11706, "Teatime Chocolate Biscuits", "9,20", '10', '92,00'],
    ];
    //alert("rows3 " + toType(rows3))
    //var rows;
    var rowItem;
    var rows;
    //alert(form.serialize());
    form.ajaxSubmit({
        dataType: 'JSON',
        type: "POST",
        url: "/Home/_OrderDetails",
        data: form.serialize(),
        success: function (o) {
            if (Object.keys(o).length > 0) {
                $.each(o, function (i, od) {
                    subtotal = od.Quantity * od.UnitPrice;
                    total += subtotal;
                    rowItem =
                        '[' +
                        od.OrderID + ',' +
                        od.Products.ProductName + ',' +
                        od.UnitPrice + ',' +
                        od.Quantity + ',' +
                        subtotal +
                        '],';
                    rows += rowItem;
                });
                var doc = new jsPDF('p', 'pt');
                doc.autoTable(columns, rows3);
                var string = doc.output('datauristring');
                var iframe = "<iframe width='100%' style='height:450px' src='" + string + "'></iframe>";
                $("#showReport").html(iframe);
            }
            else {
                $("#showReport").html();
                var iframe = "<iframe width='100%' style='height:150px' src='" + 'Parece que el pedido no tiene detalle' + "'></iframe>";
                $("#showReport").html(iframe);
            }
        },
        error: function (ex) {
            $("#showReport").html();
            var iframe = "<iframe width='100%' style='height:150px' src='" + 'Se ha producido un inconveniente' + "'></iframe>";
            $("#showReport").html(iframe);
        }
    });
    return false;
});