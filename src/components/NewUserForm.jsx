import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { USERS_API_URL } from "../constants";
import { useAppContext } from "../context/AppContext";


//const USERS_API_URL = "https://dog-sooty-seven.vercel.app/users"; // Замените на фактический URL сервера

const NewUserForm = (props) => {
  const initialData = { id: 0, name: "", email: "", account: props.account, phone: "" };
  const [formData, setFormData] = useState(initialData);
  const { getUsers } = useAppContext();

  useEffect(() => {
    if (props.user) {
      const { id, name, email, account, phone } = props.user;
      console.log('Account from props.user:', account); // Добавим этот вывод
      console.log('Props account:', props.account);
      setFormData({ id, name, email,  account, phone });
    }
    }, [props.user, props.account]);
  


  const handleChange = (e) =>
  
  setFormData((prev) => ({ ...prev,  [e.target.name]: e.target.value }));

  

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(USERS_API_URL, formData);
      console.log('Response from server:', resp);
      if (resp.status === 200) {
        console.log(' данные отправлены');
        setFormData(initialData);
        props.toggle();
       // console.log(' данные отправлены');
        getUsers();
      }  else {
        // Обработка ошибки
        console.error('Ошибка при отправке данных');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
       `${USERS_API_URL}/${props.user.id}`,
        formData
      );
      if (resp.status === 200) {
        setFormData(initialData);
        props.toggle();
        getUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };

 
  return (
    <Form onSubmit={props.user ? handleEditUser : handleAddUser}>
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          type="text"
          name="name"
          required
          onChange={handleChange}
          value={formData.name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="account">Wallet:</Label>
        <Input
          type="text"
          name="account"
          readOnly
          onChange={handleChange}
          value={formData.account}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Amount to withdraw:</Label>
        <Input
          type="text"
          name="phone"
          required
          onChange={handleChange}
          value={formData.phone}
        />
      </FormGroup>
      <Button type="submit">Send</Button>
    </Form>
  );
};
export default NewUserForm;
