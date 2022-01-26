

 // Récupération des données de l'API
 async function recupDonnées() {
     const touscanapés = await fetch("http://localhost:3000/api/products")
     return await touscanapés.json();
 }
 // Répartition des données de l'API dans le DOM
 donnéeitems();
async function donnéeitems() {
    var result = await recupDonnées()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.log(articles)
        
        for (let article in articles) {

            //  "a"
            let lienArticle = document.createElement("a");
            document.querySelector(".items").appendChild(lienArticle);
           lienArticle.href = `product.html?id=${resultatAPI[article]._id}`;

            //  "article"
            let produitArticle = document.createElement("article");
            lienArticle.appendChild(produitArticle);

            // l'image
            let imgProduit = document.createElement("img");
            produitArticle.appendChild(imgProduit);
            imgProduit.src = resultatAPI[article].imageUrl;
            imgProduit.alt = resultatAPI[article].altTxt;
         

            // "h3"
            let productName = document.createElement("h3");
            produitArticle.appendChild(productName);
            productName.innerHTML = resultatAPI[article].name;

            // "p"
            let productDescription = document.createElement("p");
            produitArticle.appendChild(productDescription);
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    .catch (function(error){
        return error;
    });
 }
