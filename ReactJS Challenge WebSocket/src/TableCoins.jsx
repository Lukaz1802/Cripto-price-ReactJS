import React, { useState, useEffect } from "react";
import { Table, Text, Input, Container } from "@nextui-org/react";

import axios from "axios";

const TableCoins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [allCoinsFilter, setAllCoinsFilter] = useState([]);
  const [filter, setFilter] = useState("");

  const CCL = 200;

  const [BTCBUSD, setBTCBUSD] = useState({});
  const [LTCBUSD, setLTCBUSD] = useState('');
  const [ETHBUSD, setETHBUSD] = useState('');
  const [MATICBUSD, setMATICBUSD] = useState('')
  const [BNBBUSD, setBNBBUSD] = useState('')
  const [AVAXBUSD, setAVAXBUSD] = useState('')
  const [LUNABUSD, setLUNABUSD] = useState('')
  const [XRPBUSD, setXRPBUSD] = useState('')
  const [SOLBUSD, setSOLBUSD] = useState('')
  const [BUSDUSDT, setBUSDUSDT] = useState('')

  const ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=btcbusd@ticker/ltcbusd@ticker/ethbusd@ticker/maticbusd@ticker/bnbbusd@ticker/avaxbusd@ticker/lunabusd@ticker/xrpbusd@ticker/solbusd@ticker/busdusdt@ticker");
  ws.onmessage = function (event) {
    let json = JSON.parse(event.data);
    try {
      if(json.data['s'] == 'BTCBUSD'){
        setBTCBUSD(json.data)

      }
      if(json.data['s'] == 'LTCBUSD')
      {
        setLTCBUSD(json.data)
      }
      if(json.data['s'] == 'ETHBUSD'){
        setETHBUSD(json.data)
      }
      if(json.data['s'] == 'MATICBUSD')
      {
        setMATICBUSD(json.data)
      }
      if(json.data['s'] == 'BNBBUSD')
      {
        setBNBBUSD(json.data)
      }
      if(json.data['s'] == 'AVAXBUSD')
      {
        setAVAXBUSD(json.data)
      }
      if(json.data['s'] == 'LUNABUSD')
      {
        setLUNABUSD(json.data)
      }
      if(json.data['s'] == 'XRPBUSD')
      {
        setXRPBUSD(json.data)
      }
      if(json.data['s'] == 'SOLBUSD')
      {
        setSOLBUSD(json.data)
      }
      if(json.data['s'] == 'BUSDUSDT')
      {
        setBUSDUSDT(json.data)
      }
    
    } catch (err) {
      console.log(err);
    }
  
    
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = allCoins.filter((elemento) => {
      if (
        elemento.symbol.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setAllCoinsFilter(resultadoBusqueda);
  };

  useEffect(() => {
  coinsFetch();
   }, []);

  function coinsFetch() {
    axios
      .get(
        'https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCBUSD","LTCBUSD","ETHBUSD","MATICBUSD","BNBBUSD","AVAXBUSD","LUNABUSD","XRPBUSD","SOLBUSD","BUSDUSDT"]'
      )
      .then((resp) => setAllCoins(resp.data) & setAllCoinsFilter(resp.data)  );
  }

  return (
    <>
      <Input
        bordered
        placeholder="Filtrar..."
        onChange={handleChange}
        value={filter}
        color="default"
        css={{ marginLeft: "40%", marginBottom: "1%" }}
      />
      <Container
        css={{
          height: "800px",
          width: "600px",
          overflowY: "scroll",
        }}
      >
          <Table bordered aria-labelledby="table" color="secondary">
          <Table.Header>
            <Table.Column
              css={{ fontSize: "20px", textAlign: "center" }}
            >Moneda</Table.Column>
                 <Table.Column
              css={{ fontSize: "20px", textAlign: "center" }}
            ></Table.Column>
             <Table.Column
              css={{ fontSize: "20px", textAlign: "center" }}
            >Precio</Table.Column>
           
          </Table.Header>
          <Table.Body>
       <Table.Row>
         <Table.Cell>
           <img src={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/btc.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
       {allCoinsFilter[1]?.symbol}
      
         </Table.Cell>
         <Table.Cell>
         
          <b>Precio ARS $</b> <br/> { (Number(BTCBUSD['a']) * CCL).toFixed(4)}  {BTCBUSD['P']?.includes('-') ? <Text color="error">{BTCBUSD['P'] + '%'}</Text> :<Text color="success">{BTCBUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>
       <Table.Row>
         <Table.Cell>
           <img src={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/ltc.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[5]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/> {(Number(LTCBUSD['a']) * CCL).toFixed(4)} {LTCBUSD['P']?.includes('-') ? <Text color="error">{LTCBUSD['P'] + '%'}</Text> :<Text color="success">{LTCBUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>

       <Table.Row>
         <Table.Cell>
           <img src={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/eth.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[4]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/>{ (Number(ETHBUSD['a']) * CCL).toFixed(4)} {ETHBUSD['P']?.includes('-') ? <Text color="error">{ETHBUSD['P'] + '%'}</Text> :<Text color="success">{ETHBUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>

       <Table.Row>
         <Table.Cell>
           <img src={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/matic.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[7]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/>  {(Number(MATICBUSD['a']) * CCL).toFixed(4)} {MATICBUSD['P']?.includes('-') ? <Text color="error">{MATICBUSD['P'] + '%'}</Text> :<Text color="success">{MATICBUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>

       <Table.Row>
         <Table.Cell>
           <img src={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/bnb.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[0]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/> {(Number(BNBBUSD['a']) * CCL).toFixed(4)} {BNBBUSD['P']?.includes('-') ? <Text color="error">{BNBBUSD['P'] + '%'}</Text> :<Text color="success">{BNBBUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>

       <Table.Row>
         <Table.Cell>
           <img src={"https://www.pngall.com/wp-content/uploads/10/Avalanche-Crypto-Logo-PNG-Pic.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[9]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/> { (Number(AVAXBUSD['a']) * CCL).toFixed(4)} {AVAXBUSD['P']?.includes('-') ? <Text color="error">{AVAXBUSD['P'] + '%'}</Text> :<Text color="success">{AVAXBUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>

       <Table.Row>
         <Table.Cell>
           <img src={"https://s2.coinmarketcap.com/static/img/coins/200x200/4172.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[8]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/> { (Number(LUNABUSD['a']) * 200).toFixed(4)} {LUNABUSD['P']?.includes('-') ? <Text color="error">{LUNABUSD['P'] + '%'}</Text> :<Text color="success">{LUNABUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>

       <Table.Row>
         <Table.Cell>
           <img src={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/xrp.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[3]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/>{ (Number(XRPBUSD['a']) * 200).toFixed(4)} {XRPBUSD['P']?.includes('-') ? <Text color="error">{XRPBUSD['P'] + '%'}</Text> :<Text color="success">{XRPBUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>

       <Table.Row>
         <Table.Cell>
           <img src={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/sol.png"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[6]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/>{(Number(SOLBUSD['a']) * 200).toFixed(4)} {SOLBUSD['P']?.includes('-') ? <Text color="error">{SOLBUSD['P'] + '%'}</Text> :<Text color="success">{SOLBUSD['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>
       <Table.Row>
         <Table.Cell>
           <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_nE_iJc2jxYHUdgGfeAvY7efu9R42AhRzG203yZiL2qJNY9loootX-6axY-DHdT0rus&usqp=CAU"} width="80"/> 
      
         </Table.Cell>
         <Table.Cell>
         {allCoinsFilter[2]?.symbol}
         </Table.Cell>
         <Table.Cell> 
         <b>Precio ARS $</b> <br/>{ (1/(Number(BUSDUSDT['b'])) * 200).toFixed(4)} {BUSDUSDT['P']?.includes('-') ? <Text color="error">{BUSDUSDT['P'] + '%'}</Text> :<Text color="success">{BUSDUSDT['P'] + '%'}</Text> }
         </Table.Cell>
       </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </>
  );
};

export default TableCoins;
