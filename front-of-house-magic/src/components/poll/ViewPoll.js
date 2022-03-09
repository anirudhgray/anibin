import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Card,
  Skeleton,
  Text,
  Title,
  Radio,
  RadioGroup,
  Button,
  Loader,
  Alert,
  Modal,
} from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import dayjs from 'dayjs';

import axios from '../../axios.js';

export default function ViewPoll() {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [choice, setChoice] = useState('');
  const [sending, setSending] = useState(false);
  const [opened, setOpened] = useState(false);
  const [alreadySub, setAlreadySub] = useState(false);

  const navigate = useNavigate();

  const getDate = (dateString) => {
    let d = new Date(dateString);
    let day = dayjs(d);
    return day.format('HH:mm on DD/MM/YYYY');
  };

  useEffect(async () => {
    await axios
      .get(`/polls/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          return navigate('/poll-not-found');
        }
        if (e.response.status === 401) {
          return navigate(`/polls/${id}/responses`);
        }
      });
  }, [id]);

  const options = [];
  if (data) {
    for (let i = 0; i < data.options.length; i++) {
      options.push(
        <Radio key={i} value={data.options[i]}>
          {data.options[i]}
        </Radio>
      );
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const resObj = {
      response: choice,
    };
    await axios
      .post(`/polls/${id}/responses`, resObj)
      .then((res) => {
        setSending(false);
        setOpened(true);
      })
      .catch((error) => {
        if (e.response.status === 401) {
          return navigate(`/polls/${id}/responses`);
        }
        setSending(false);
        console.log(error);
      });
  };

  return (
    <div className="flex flex-column">
      <Title className="mb-3" order={3}>
        Poll
      </Title>
      {data && !loading ? (
        <form onSubmit={handleSubmit} className="flex flex-column">
          <Card shadow="md">
            <Title>{data.question}</Title>
            <Text color="gray">
              Created at <strong>{getDate(data.createdAt)}</strong>
            </Text>
            {data.details ? (
              <RichTextEditor
                readOnly={true}
                className="my-3"
                value={data.details}
              ></RichTextEditor>
            ) : null}
            <RadioGroup
              variant="vertical"
              value={choice}
              onChange={setChoice}
              label="Options"
              required={true}
            >
              {options}
            </RadioGroup>
          </Card>
          <Button
            className="mt-5 mx-auto"
            variant="filled"
            color="grape"
            type="submit"
            disabled={!choice}
          >
            {!sending ? (
              <Text>Answer</Text>
            ) : (
              <Loader color="white" size="sm"></Loader>
            )}
          </Button>
          {!data.singleResponse ? (
            <Button
              className="mt-5 mx-auto"
              component={Link}
              to={`/polls/${id}/responses`}
              variant="subtle"
            >
              View Responses/Stats
            </Button>
          ) : null}
        </form>
      ) : (
        <div>
          <Skeleton height={50} className="w-5 mb-3"></Skeleton>
          <Skeleton height={20} className="w-3 mb-3"></Skeleton>
          <Skeleton height={100} className="w-12 mb-3"></Skeleton>
          <div className="flex justify-content-between">
            <Skeleton height={70} circle className="mb-3"></Skeleton>
            <Skeleton height={70} className="w-10 mb-3"></Skeleton>
          </div>
        </div>
      )}

      <Modal
        centered={true}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Response submitted."
        size="lg"
        overlayOpacity={0.85}
      >
        <Button component={Link} to={`/polls/${id}/responses`} variant="subtle">
          View Responses/Stats
        </Button>
      </Modal>
    </div>
  );
}
