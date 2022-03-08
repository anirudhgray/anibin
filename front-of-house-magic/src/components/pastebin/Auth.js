import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Title,
  PasswordInput,
  Button,
  Loader,
  Text,
} from '@mantine/core';
import { LockClosedIcon } from '@modulz/radix-icons';

import PasteCard from './PasteCard.js';

import axios from '../../axios.js';

export default function Auth() {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .get(`/pastes/${id}/protected`, {
        headers: {
          authorization: password,
        },
      })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
        console.log(res);
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setInvalid(true);
          setLoading(false);
        }
        console.log(e);
      });
  };

  return (
    <div className="flex justify-content-center">
      {!response ? (
        <Card
          shadow="md"
          className="flex flex-column align-items-center md:w-6 sm:w-8 w-12"
        >
          <Card.Section className="flex py-6">
            <LockClosedIcon
              width={45}
              height={45}
              color="red"
              className="mx-auto"
            />
          </Card.Section>
          <Title className="text-center" order={2}>
            Protected Resource.
          </Title>
          <form
            onSubmit={handleSubmit}
            className="lg:w-6 md:w-8 sm:w-10 w-12 flex flex-column"
          >
            <PasswordInput
              placeholder="Password"
              required={true}
              className="my-3"
              value={password}
              error={invalid ? 'Invalid Password' : null}
              onChange={(e) => setPassword(e.currentTarget.value)}
            ></PasswordInput>
            <Button className="mx-auto" type="submit" variant="subtle">
              {!loading ? <Text>Proceed</Text> : <Loader size="sm"></Loader>}
            </Button>
          </form>
        </Card>
      ) : (
        <PasteCard data={response}></PasteCard>
      )}
    </div>
  );
}
