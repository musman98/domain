const { request, response } = require('express');
var express = require('express');
var axios = require('axios')
var app = express();
app.get('/I/want/my/title', async function(req,res) { 
    try {
        var url = [];
        var title = [];
        for(var i= 0 ; i <  req.query.address.length;i++){
            let address = req.query.address[i];
            let response = await axios.get(address);
            let addressData = response.data;
            
            if (addressData.split('<title>').length > 1) {
                addressData = addressData.split('<title>')[1];
                addressData = addressData.split('</title>')[0];
                title.push(addressData);
            }
            else {
                title.push({error: address + " has no title"})
            }
            
        }
        res.json(title);
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})

app.listen(3000) 