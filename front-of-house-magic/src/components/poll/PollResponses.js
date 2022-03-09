import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  Card,
  Text,
  Title,
  useMantineTheme,
  useMantineColorScheme,
  Button,
} from '@mantine/core';

import axios from '../../axios.js';

export default function PollResponses() {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  useEffect(async () => {
    await axios
      .get(`/polls/${id}/responses`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          return navigate('/poll-not-found');
        }
        console.log(e);
      });
  }, [id]);

  const stats = {};
  if (data) {
    for (let i = 0; i < data.poll.options.length; i++) {
      stats[data.poll.options[i]] = data.responses.filter(
        (response) => response.response === data.poll.options[i]
      ).length;
    }
  }
  console.log(stats);
  const statElements = [];
  for (const choice in stats) {
    let percentage = (stats[choice] * 100) / data.responses.length;
    if (Number.isNaN(percentage)) {
      percentage = 0;
    }
    percentage = percentage.toFixed(2);
    statElements.push(
      <Card
        shadow="md"
        key={choice}
        className="grid"
        style={{
          background: `linear-gradient(90deg, ${
            theme.colors.violet[4]
          } ${percentage}%, ${dark ? theme.colors.dark[6] : 'white'} 0)`,
        }}
      >
        <Text
          color={theme.colors.dark[0]}
          style={{ mixBlendMode: 'difference' }}
          className="col-10"
        >
          {choice}
        </Text>
        <Text className="col-2 text-right">
          {stats[choice]} | {percentage}%
        </Text>
      </Card>
    );
  }

  return (
    <div>
      {data && !loading ? (
        <div>
          <Title order={3}>Poll Responses</Title>
          <Text>{data.poll.question}</Text>
          {!data.poll.singleResponse ? (
            <Button
              variant="subtle"
              component={Link}
              to={`/polls/${id}`}
              color="violet"
            >
              View Poll
            </Button>
          ) : null}
          <Text>
            <span style={{ color: 'violet' }} className="text-6xl font-bold">
              {data.responses.length}
            </span>{' '}
            response(s).
          </Text>
          <Title className="mt-3" order={4}>
            Stats
          </Title>
          <div className="mt-3 flex flex-column" style={{ gap: '1rem' }}>
            {statElements}
          </div>
        </div>
      ) : null}
    </div>
  );
}
