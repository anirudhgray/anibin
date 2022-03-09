import React, { useEffect, useState } from 'react';

import { Container, Title, MediaQuery, Badge } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon, GitHubLogoIcon } from '@modulz/radix-icons';
import { useHotkeys } from '@mantine/hooks';

import PollPasteTabs from './PollPasteTabs';
import axios from '../../axios.js';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [pollCount, setPollCount] = useState(0);
  const [pasteCount, setPasteCount] = useState(0);

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  useEffect(async () => {
    await axios
      .get('/counts')
      .then((res) => {
        setPollCount(res.data.pollCount);
        setPasteCount(res.data.pasteCount);
      })
      .catch((e) => console.log(e));
  }, [pollCount, pasteCount]);

  return (
    <Container className="pt-3 pb-6">
      <div className="grid align-items-center">
        <div className="sm:col-3 col-6 flex flex-column">
          <Title
            style={{ textDecoration: 'none' }}
            component={Link}
            to="/"
            className="pb-1"
            order={1}
          >
            anibin.
          </Title>
          <Badge className="max-w-min" color="lime">
            ({pasteCount} + {pollCount}) pastes/polls made!
          </Badge>
        </div>
        <MediaQuery
          smallerThan="xs"
          styles={{ display: 'none', marginTop: 50 }}
        >
          <div className="sm:col-6">
            <PollPasteTabs></PollPasteTabs>
          </div>
        </MediaQuery>
        <div className="sm:col-3 col-6">
          <div className="w-min ml-auto flex" style={{ gap: '0.5rem' }}>
            <ActionIcon
              component="a"
              target="_blank"
              href="https://github.com/anirudhgray/anibin"
              variant="outline"
              radius="lg"
              size="lg"
              title="Github"
            >
              <GitHubLogoIcon style={{ width: 18, height: 18 }} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              radius="lg"
              size="lg"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? (
                <SunIcon style={{ width: 18, height: 18 }} />
              ) : (
                <MoonIcon style={{ width: 18, height: 18 }} />
              )}
            </ActionIcon>
          </div>
        </div>
        <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
          <div className="col-12">
            <PollPasteTabs></PollPasteTabs>
          </div>
        </MediaQuery>
      </div>
    </Container>
  );
}
