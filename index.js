const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    const data = fs.readFileSync("./db.json","utf-8");
    const parse_data=JSON.parse(data);
    const product=parse_data.product;
    console.log('product: ', product);
    res.send(product)
})

app.post("/post",(req,res)=>{
    const body = req.body;
    const data = fs.readFileSync("./db.json","utf-8");
    const parse_data = JSON.parse(data);
    const products=[...parse_data.product,body];
    
    parse_data.product=products;
    fs.writeFileSync('./db.json',JSON.stringify(parse_data),"utf-8");
    res.send(products)
})

app.put("/post/:id",(req,res)=>{
    const {id} = req.params;
    console.log('id: ', id);
    const {price,name} = req.body;
    console.log('price,name: ', price,name);
    const data = fs.readFileSync("./db.json","utf-8");
    const parse_data = JSON.parse(data);

    const product=parse_data.product.map((el)=>{
        if(el.id==+id){
            return{...el,price:price,name:name,id:+id}
        }else{
            return el;
        }
    });
    parse_data.product=product;
    fs.writeFileSync('./db.json',JSON.stringify(parse_data),"utf-8")
    res.send(product)
})

app.delete("/post/:id",(req,res)=>{
    const {id} = req.params;
    
    const data = fs.readFileSync("./db.json","utf-8");
    const parse_data = JSON.parse(data);
    const product=parse_data.product.filter((el)=>el.id !== +id)
    
    parse_data.product=product;
    fs.writeFileSync('./db.json',JSON.stringify(parse_data),"utf-8")
    res.send(product)
})



app.listen(8080,()=>{
    console.log("Port is running");
})