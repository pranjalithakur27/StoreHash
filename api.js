var express = require('express');
var app = express();

app.use(express.json());

var Web3 = require('web3');

var storage_artifacts =  require("./build/contracts/Store.json");
var storageabi = storage_artifacts.abi;
var storageaddress = storage_artifacts.networks[5777].address;

var init = async() => {

    var web3 = new Web3('http://localhost:7545');

    var storageinstance = new web3.eth.Contract(storageabi, storageaddress);

    var addresses = await web3.eth.getAccounts();

    app.get('/', function(req, res) {

        res.send("API server");
    
    });

    app.post('/add', function(req, res) {

        var id = req.body.id;
        var data = req.body.data;
    
        storageinstance.methods.addHash(id, data).send({
            from: addresses[0],
            gas: 3000000
        }, function(err, result) {
            console.log(result);
    
            if (!err) {
                res.send('Document Hash Added');
    
            } else
            res.status(401).json("Error" + err);
        });
    
    });


    app.get('/get/:id', function(req, res) {

        var id = req.params.id;
    
        storageinstance.methods.getHash(id).call({
            from: addresses[0],
            gas: 3000000
        }, function(err, result) {
            console.log(result);
    
            if (!err) {
                res.json(result);
            } else
            res.status(401).json("Error" + err);
        });
    
    });
    

}
init();

//PORT
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));