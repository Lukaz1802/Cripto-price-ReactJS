import React, { useState, useEffect } from "react";
import { Table, Text, Input, Container } from "@nextui-org/react";

import axios from "axios";

const TableCoins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [allCoinsFilter, setAllCoinsFilter] = useState([]);
  const [filter, setFilter] = useState("");

  const CCL = 200;

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
      .then((resp) => setAllCoins(resp.data) & setAllCoinsFilter(resp.data));
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
              css={{ fontSize: "20px", textAlign: "right" }}
            >Moneda</Table.Column>
            <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
              
            </Table.Column>
            <Table.Column css={{ fontSize: "20px", textAlign: "left" }}>
              Precio
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {allCoinsFilter &&
              allCoinsFilter?.map((coin) => (
                <Table.Row key={coin?.firstId}>
                  <Table.Cell>
                    <img
                      src={
                        coin?.symbol === "BNBBUSD"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/bnb.png"
                          : coin.symbol === "BTCBUSD"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/btc.png"
                          : coin?.symbol === "BUSDUSDT"
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_nE_iJc2jxYHUdgGfeAvY7efu9R42AhRzG203yZiL2qJNY9loootX-6axY-DHdT0rus&usqp=CAU"
                          : coin?.symbol === "XRPBUSD"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/xrp.png"
                          : coin?.symbol === "ETHBUSD"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/eth.png"
                          : coin?.symbol === "LTCBUSD"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/ltc.png"
                          : coin?.symbol === "SOLBUSD"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/sol.png"
                          : coin?.symbol === "MATICBUSD"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/matic.png"
                          : coin?.symbol === "LUNABUSD"
                          ? "https://s2.coinmarketcap.com/static/img/coins/200x200/4172.png"
                          : "https://www.pngall.com/wp-content/uploads/10/Avalanche-Crypto-Logo-PNG-Pic.png"
                      }
                      width="80"
                      height="80"
                    />
                  </Table.Cell>
                  <Table.Cell>{coin?.symbol}</Table.Cell>
                  <Table.Cell> <b>ARS$</b> <br/>{`${coin?.symbol == 'BUSDUSDT' ? (1/ Number(coin?.bidPrice) * CCL ).toFixed(4) : (Number(coin?.askPrice) * CCL).toFixed(4)}`} <br/> {coin?.priceChangePercent.includes('-') ?   <Text color="error">
{coin?.priceChangePercent}%      </Text> :  <Text color="success">
{coin?.priceChangePercent}%      </Text>} </Table.Cell>
                </Table.Row>  
              ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
};

export default TableCoins;
