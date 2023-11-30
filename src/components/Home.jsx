import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import ListUsers from "./ListUsers";
import NewUserModal from "./NewUserModal";
import { useAppContext } from "../context/AppContext";
import { ethers } from 'ethers';

const {ethereum} = window

const Home = () => {
  const { users } = useAppContext();
  const [accounts, setAccount] = useState()

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (ethereum) {
      try {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();
        setAccount(accounts);
      } catch (error) {
        console.error("Failed to load provider:", error);
      }
    } else {
      console.log("No wallet found!");
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
        <Button onClick={checkIfWalletIsConnected}>Connect</Button>
      <Row>
        <Col>
          <ListUsers users={users} />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewUserModal create={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
