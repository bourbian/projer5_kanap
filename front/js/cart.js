 
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
         //console.log(produitLocalStorage);
         console.table(produitLocalStorage);
//affichage des produits de panier
//selectionner la classe ou je vais injecter le code js
const positionElement = document.querySelector("#cart__items");
//si le panier est vide
function getCart(){
if(produitLocalStorage == null || produitLocalStorage==0){
    const paniervide = "Votre panier est vide";
    positionElement.innerHTML = paniervide;
    console.log(paniervide);
 
}else {
   
    
        for (let produit of produitLocalStorage){
        console.log(produitLocalStorage.length);
        console.log(produit);
      
       let productArticle = document.createElement("article");
       document.querySelector("#cart__items").appendChild(productArticle);
       productArticle.className = "cart__item";
       productArticle.setAttribute('data-id', produit.idProduit);
   
       // Insertion de l'élément "div"
       let productDivImg = document.createElement("div");
       productArticle.appendChild(productDivImg);
       productDivImg.className = "cart__item__img";
   
       // Insertion de l'image
       let productImg = document.createElement("img");
       productDivImg.appendChild(productImg);
       productImg.src = produit.imgProduit;
       productImg.alt = produit.altImgProduit;
       
       // Insertion de l'élément "div"
       let productItemContent = document.createElement("div");
       productArticle.appendChild(productItemContent);
       productItemContent.className = "cart__item__content";
   
       // Insertion de l'élément "div"
       let productItemContentTitlePrice = document.createElement("div");
       productItemContent.appendChild(productItemContentTitlePrice);
       productItemContentTitlePrice.className = "cart__item__content__titlePrice";
       
       // Insertion du titre h3
       let productTitle = document.createElement("h2");
       productItemContentTitlePrice.appendChild(productTitle);
       productTitle.innerHTML = produit.nomProduit;
   
       // Insertion de la couleur
       let productColor = document.createElement("p");
       productTitle.appendChild(productColor);
       productColor.innerHTML = produit.couleurProduit;
       productColor.style.fontSize = "20px";

       // Insertion du prix
     


       let productPrice = document.createElement("p");
       productItemContentTitlePrice.appendChild(productPrice);
     //recuperer le prix de l api
     
  
    recupPrixArticle();   
    
     async function recupPrixArticle() {
       const response = await fetch("http://localhost:3000/api/products/" + produit.idProduit);
       const data = await response.json();
       console.log("data.price");
       console.log(data.price);
     productPrice.innerHTML = "Pu : "+ data.price  + " €";
     
     function QttPriceTotals(){

        // Récupération du total des quantités
        var elemQtt = document.getElementsByClassName('itemQuantity');
        var myLength = elemQtt.length,
        totalQtt = 0;
        for (var i = 0; i < myLength; ++i) {
            totalQtt += elemQtt[i].valueAsNumber;  
        }
        let productTotalQuantity = document.getElementById('totalQuantity');
        productTotalQuantity.innerHTML = totalQtt;
        console.log(totalQtt);
        // Récupération du prix total
        totalPrice = 0;
        for (var i = 0; i < myLength; ++i) {
            totalPrice += (elemQtt[i].valueAsNumber * data.price );
        }
     let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalPrice;
        console.log(totalPrice);
    }  
    QttPriceTotals();
     }
         // Insertion de l'élément "div"
       let productItemContentSettings = document.createElement("div");
       productItemContent.appendChild(productItemContentSettings);
       productItemContentSettings.className = "cart__item__content__settings";
   
       // Insertion de l'élément "div"
       let productItemContentSettingsQuantity = document.createElement("div");
       productItemContentSettings.appendChild(productItemContentSettingsQuantity);
       productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
       
       // Insertion de "Qté : "
       let productQte = document.createElement("p");
       productItemContentSettingsQuantity.appendChild(productQte);
       productQte.innerHTML = "Qté : ";
       
       // Insertion de la quantité
       let productQuantity = document.createElement("input");
       productItemContentSettingsQuantity.appendChild(productQuantity);
       productQuantity.value = produit.quantiteProduit;
       productQuantity.className = "itemQuantity";
       productQuantity.setAttribute("type", "number");
       productQuantity.setAttribute("min", "1");
       productQuantity.setAttribute("max", "100");
       productQuantity.setAttribute("name", "itemQuantity");
   
       // Insertion de l'élément "div"
       let productItemContentSettingsDelete = document.createElement("div");
       productItemContentSettings.appendChild(productItemContentSettingsDelete);
       productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
   
       // Insertion de "p" supprimer
       let productSupprimer = document.createElement("p");
       productItemContentSettingsDelete.appendChild(productSupprimer);
       productSupprimer.className = "deleteItem";
       productSupprimer.innerHTML = "Supprimer";
       console.log(productSupprimer);
        }}
    }
    getCart();


       function deleteProduct() {
       let btn_supprimer = document.querySelectorAll(".deleteItem")
       for ( let l = 0; l < btn_supprimer.length; l++ ){
        btn_supprimer[l].addEventListener("click" , (event) => {
            event.preventDefault();

            let idsupprimer =  produitLocalStorage[l].idProduit;
            let coleursupprimer =  produitLocalStorage[l].couleurProduit;
            //console.log("idsupprimer");
            //console.log(btn_supprimer);

            produitLocalStorage = produitLocalStorage.filter(
                (el) => el.idProduit !== idsupprimer || el.couleurProduit !== coleursupprimer );
            console.log(produitLocalStorage);


            localStorage.setItem( "produit", JSON.stringify(produitLocalStorage));
                alert("Ce produit a bien été supprimé du panier");
                window.location.href = "cart.html";
            
        });
       }
      
    }
     deleteProduct();

//***************************************************************************** */
    /* function QttPriceTotals(){

        // Récupération du total des quantités
        var elemQtt = document.getElementsByClassName('itemQuantity');
        var myLength = elemQtt.length,
        totalQtt = 0;
        for (var i = 0; i < myLength; ++i) {
            totalQtt += elemQtt[i].valueAsNumber;  
        }
        let productTotalQuantity = document.getElementById('totalQuantity');
        productTotalQuantity.innerHTML = totalQtt;
        console.log(totalQtt);
        // Récupération du prix total
        totalPrice = 0;
        for (var i = 0; i < myLength; ++i) {
            totalPrice += (elemQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit );
        }
     let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalPrice;
        console.log(totalPrice);
    }  
    QttPriceTotals();*/

    // Modification d'une quantité de produit
function modifQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
        
            // refresh rapide
            location.reload();
        })
    }
}
modifQtt();


//*************************************************************************************************** */



//.................................formulaire...................
//selection bouton envoyer
const btnenvoyer = document.getElementById("order");
//..............................................addEnvetListener.............................
btnenvoyer.addEventListener("click", (event)=> {
   event.preventDefault();
//recuperation des valeurs des formulaire
const formulaireValeur = {
    firstName : document.getElementById("firstName").value,
    lastName : document.getElementById("lastName").value,
    address : document.getElementById("address").value,
    city : document.getElementById("city").value,
    email : document.getElementById("email").value
}

//....................gestion validation du formulaire.....................................

const regExPrenomNomVille = (value) => {
    return /^([a-zA-Z]{3,20})?([-]{0,1})?([a-zA-Z]{3,20})$/.test(value);
}
//controler le prenom
function controleprenom() {
const lePrenom = formulaireValeur.firstName;

console.log(lePrenom);
    if (regExPrenomNomVille(lePrenom)) {
        console.log("ok");
        document.querySelector("#firstNameErrorMsg").textContent = "";
    return true;
    } else {
        document.querySelector("#firstNameErrorMsg").textContent = "Veuillez bien remplir ce champ";
    return false;
    }
};
//controle le nom
function controlenom() {

const lenom = formulaireValeur.lastName;
console.log(lenom);
    if (regExPrenomNomVille(lenom)) {
        console.log("ok");
        document.querySelector("#lastNameErrorMsg").textContent = "";
    return true;
    } else {
        document.querySelector("#lastNameErrorMsg").textContent = "Veuillez bien remplir ce champ";
    return false;
    }
};
//controle de l Email
const regExemail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}
function controlemail() {
    const lemail = formulaireValeur.email;
    console.log(lemail);
        if (regExemail(lemail)) {
            console.log("ok");
            document.querySelector("#emailErrorMsg").textContent = "";
        return true;
        } else {
            document.querySelector("#emailErrorMsg").textContent = "Veuillez bien remplir ce champ";
        console.log("ko");
        return false;
        }
    };
    //controle de l adresse
    const regExadresse = (value) => {
        return /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(value);
    }
    function controleadresse() {
        const ladresse = formulaireValeur.address;
        console.log(ladresse);
            if (regExadresse(ladresse)) {
                console.log("ok");
                document.querySelector("#addressErrorMsg").textContent = "";
            return true;
            } else {
                document.querySelector("#addressErrorMsg").textContent = "Veuillez bien remplir ce champ";
            console.log("ko");
            return false;
            }
        }; 
          //controle la ville
        function controlaville() {
          const laville = formulaireValeur.city;
            console.log(laville);
                if (regExPrenomNomVille(laville)) {
                    console.log("ok");
                    document.querySelector("#cityErrorMsg").textContent = "";
                return true;
                } else {
                    document.querySelector("#cityErrorMsg").textContent = "Veuillez bien remplir ce champ";
                return false;
                }
            }; 




  
   
//controle validité formulaire avant envoie dans le locale storage

if ( controleprenom() && controlenom() && controlemail() && controleadresse() && controlaville() ) {
//mettre formulaireValeur dans le locale storage
localStorage.setItem("formulaireValeur", JSON.stringify(formulaireValeur));
//mettre les valeurs de formulaire et les produits dans un objet et envoyer au serveur
let idProducts = [];
for (let i = 0; i<produitLocalStorage.length;i++) {
    idProducts.push(produitLocalStorage[i].idProduit);
}
console.log("idProducts");
console.log(idProducts);
//produitLocalStorage, 
const order = {
     contact:formulaireValeur,
   products: idProducts,
};

console.log("order");
console.log(order);
console.log(JSON.stringify(order));

fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    body: JSON.stringify(order),
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'

    },
})

.then((res)=>{
    if(res.ok) console.log(res);
    return res.json();
    
    })
.then((data)=>{
    console.log("data");
    console.log(data);
    localStorage.setItem("orderId", data.orderId);
    console.log("data.orderId");
    console.log(data.orderId);
    alert("Merci pour votre commande");
    document.location.href = `confirmation.html?orderId=${data.orderId}`;
})
.catch((error) =>{
    console.log(error);
    alert("veuillez contacter l administrateur")

});
} else {
    alert("Veuillez bien remplir le formulaire")
    
};


//....................fin gestion validation du formulaire.....................................

});

/*

//..........mettre le contenu du localstorage dans les champs du formulaire....................
//prendre la key du localstorage et la mettre dans une variable
const datalocalestorage = localStorage.getItem("formulaireValeur");
const datalocalestorageobjet = JSON.parse(datalocalestorage);
//mettre les valeurs du localstorage dans les champs du formulaire
document.querySelector("#firstName").value = datalocalestorageobjet.Prenom;
document.querySelector("#lastName").value = datalocalestorageobjet.nom;
document.querySelector("#address").value = datalocalestorageobjet.Adresse;
document.querySelector("#city").value = datalocalestorageobjet.Ville;
document.querySelector("#email").value = datalocalestorageobjet.Email;

console.log("datalocalestorageobjet");
console.log(datalocalestorage);
console.log(datalocalestorageobjet);


   
   */
   
   
    

