//gestion de la page confirmation
function confirmationcmd(){
    const urlorder = window.location.search;
    const urlsearchparamsorder = new URLSearchParams(urlorder);
    const OrderId1 = urlsearchparamsorder.get('orderId');
    document.getElementById("orderId").textContent =`${OrderId1}`;
console.log("OrderId1");    
console.log(OrderId1);
}
confirmationcmd();

