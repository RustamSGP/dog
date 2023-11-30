import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { USERS_API_URL } from "../constants";
import { useAppContext } from "../context/AppContext";

const NewUserForm = (props) => {
  const initialData = { id: 0, name: "", email: "", document: "", phone: "" };
  const [formData, setFormData] = useState(initialData);
  const { getUsers } = useAppContext();

  useEffect(() => {
    if (props.user) {
      const { id, name, email, document, phone } = props.user;
      setFormData({ id, name, email, document, phone });
    }
  }, [props.user]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
        <Label for="document">Wallet:</Label>
        <Input
          type="text"
          name="document"
          required
          onChange={handleChange}
          value={formData.document}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone:</Label>
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
