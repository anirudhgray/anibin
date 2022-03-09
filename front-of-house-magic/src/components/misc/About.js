import React from 'react';
import { Title, Text, Button, Kbd } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <Title order={3}>About</Title>
      <Text>
        This is a web app with two main functionalities: a quick{' '}
        <Button variant="subtle" component={Link} to="/poll/create">
          poll maker
        </Button>{' '}
        and a nifty{' '}
        <Button variant="subtle" component={Link} to="/pastebin/create">
          Pastebin clone
        </Button>{' '}
        (with syntax highlighting for multiple languages).
      </Text>
      <Text className="my-3">
        Built using Node.js, React.js, MongoDb and Mantine.
      </Text>
      <Text className="mb-6">
        <Kbd>Ctrl</Kbd> + <Kbd>J</Kbd> to toggle dark mode.
      </Text>
      <Title order={4}>Sitemap</Title>
      <div className="mt-3 mb-6 flex flex-column w-min" style={{ gap: '1rem' }}>
        <Link className="aboutLink" to="/create/pastebin">
          /create/pastebin
        </Link>
        <Link className="aboutLink" to="/create/poll">
          /create/poll
        </Link>
        <Link className="aboutLink" to="/pastes/:id">
          /pastes/:id
        </Link>
        <Link className="aboutLink" to="/polls/:id">
          /polls/:id
        </Link>
        <Link className="aboutLink" to="/about">
          /about
        </Link>
      </div>
      <Title className="mb-3" order={4}>
        API
      </Title>
      <Text>Root: herokuapp url</Text>
    </div>
  );
}
