const urlstring = window.location.href;
const url = new URL(urlstring);
const idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

recupArticle();
// Récupération des articles de l'API
function recupArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => {
        return response.json();
    })
    // Répartition des données de l'API dans le DOM
   
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.log(article);
        if (article){
            get(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
} 


recupPrixArticle();    
 async function recupPrixArticle() {
   const response = await fetch("http://localhost:3000/api/products/" + idProduct);
   const data = await response.json();
   console.log("data.price");
   console.log(data.price);

}






function get(article){
    // Insertion image
    let imgProduit = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgProduit);
    imgProduit.src = article.imageUrl;
    imgProduit.alt = article.altTxt;
    // Modification  "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;
    // Modification  prix initial
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;
   
 
    // Modification description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors){
        console.log(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
       productColors.value = colors;
        productColors.innerHTML = colors;
    }
        addToCart(article)
    }
    //Gestion du panier
    function addToCart(article) {
    const boutonEnvoyer = document.querySelector("#addToCart");

                // le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    boutonEnvoyer.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){
         //Recupération du choix de la couleur
        let choixCouleur = colorPicked.value;
                
         //Recupération du choix de la quantité
        let choixQuantite = quantityPicked.value;

         //Récupération des options de l'article à ajouter au panier
         let optionsProduit = {
             idProduit: idProduct,
             couleurProduit: choixCouleur,
             quantiteProduit: Number(choixQuantite),
             nomProduit: article.name,
            // prixProduit:article.price,
             descriptionProduit: article.description,
             imgProduit: article.imageUrl,
             altImgProduit: article.altTxt
         };
         
                 //Initialisation du local storage
       //let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
        console.log("produitLocalStorage");
         console.log(produitLocalStorage);

        const popupConfirmation = () =>{
        if (window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
        Pour consulter votre panier.cliquez sur OK ou revenir à l'accueil, cliquer sur Annuler`)) {
         window.location= "cart.html";
         } else {
         window.location.href = "index.html";
         }
    
         }
   //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
        if (produitLocalStorage) {
            const resultFind = produitLocalStorage.find(
                (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
                //Si le produit commandé est déjà dans le panier
                if (resultFind) {
                    let newQuantite =
                    parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                    resultFind.quantiteProduit = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

                    console.table(produitLocalStorage);
                    popupConfirmation();
                } else {
                    produitLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.log(produitLocalStorage);
                    popupConfirmation();
          }   
        //Si le panier est vide
   
        } else {
            produitLocalStorage =[];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.log(produitLocalStorage);
            popupConfirmation();
   
            }
          }}  );
    }
 
    