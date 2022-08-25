






































const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb + srv://sheer_sh:Sheer25042004@cluster0.pzbwrhq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    const collection = client.db("MakeupProducts").collection("products");
    console.log("did it");
    // perform actions on the collection object
    client.close();
})

const searchBtn = document.getElementById('search-btn');
const productList = document.getElementById('product');

searchBtn.addEventListener('click', getProductList);

function getProductList() {
    let searchInputText = document.getElementById('search-input').value.trim();
    db.MakeupProducts.products.find({ name: { searchInputText } }).then(data => {
        console.log(data);
    })
}


