import { useState, useEffect } from "react";
import { Container, Row, Col, Button, CardText } from "reactstrap";
import ListUsers from "./ListUsers";
import NewUserModal from "./NewUserModal";
import { useAppContext } from "../context/AppContext";
import { ethers } from 'ethers';

const { ethereum } = window;

const Home = () => {
  const { users } = useAppContext();
  const [ account, setAccount] = useState();

useEffect(() => {
    checkIfWalletIsConnected();
}, []);


  const checkIfWalletIsConnected = async () => {
    if (ethereum) {
      try {

        // Запрашиваем разрешение у пользователя на подключение к аккаунту Metamask
       const accounts =  await window.ethereum.request({ method: 'eth_requestAccounts' })
          console.log(accounts);
          const account = accounts[0];
          console.log(account);
          setAccount(account);
         // Подписываемся на событие accountsChanged
         ethereum.on('accountsChanged', handleAccountsChanged);
        

     /*  const provider = new ethers.BrowserProvider(ethereum);
       const signer = provider.getSigner();
       const account = await signer.getAddress0(0);*/
   
      } catch (error) {
        console.error("Failed to load provider:", error);
      }
    } else {
      console.log("No wallet found!");
    }
  };

  const handleAccountsChanged = (newAccounts) => {
    if (newAccounts.length === 0) {
      // Аккаунт отключен, обновляем страницу
      window.location.reload();
    } else {
      // Аккаунт изменен, обрабатываем по вашему усмотрению
      const newAccount = newAccounts[0];
      console.log("Account changed:", newAccount);
      setAccount(newAccount);
    }
  }

  return (
    <Container  style={{ marginTop: "20px" }}>
       <Button onClick={checkIfWalletIsConnected}>Connect</Button>
       
      <Row>
        <Col>
          <ListUsers users={users} />
        </Col>
      </Row>
      {account && (
      <Row>
        <Col>
          <NewUserModal create={true} account={account} />
        </Col>
      </Row>
   
    )}
    </Container>
  );
};

export default Home;
