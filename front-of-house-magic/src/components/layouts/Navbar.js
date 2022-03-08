import React, { useEffect, useState } from 'react';

import { Container, Title, MediaQuery, Badge } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon, GitHubLogoIcon } from '@modulz/radix-icons';

import PollPasteTabs from './PollPasteTabs';
import axios from '../../axios.js';

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [count, setCount] = useState(0);

  useEffect(async () => {
    await axios
      .get('/count/pastes')
      .then((res) => {
        setCount(res.data.count);
      })
      .catch((e) => console.log(e));
  }, [count]);

  return (
    <Container className="pt-3 pb-6">
      <div className="grid align-items-center">
        <div className="sm:col-3 col-6">
          <Title className="pb-1" order={1}>
            anibin.
          </Title>
          <Badge color="lime">{count} pastebins made!</Badge>
        </div>
        <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
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
      {/* <Grid className="align-items-center">
        <Grid.Col span={6} xs={3}>
          <Title className="pb-1" order={1}>
            anibin.
          </Title>
        </Grid.Col>
        <Grid.Col xs={6}>
          <PollPasteTabs></PollPasteTabs>
        </Grid.Col>
        <Grid.Col span={6} xs={3}>
          <div className="w-min ml-auto flex" style={{ gap: '0.5rem' }}>
            <ActionIcon
              component="a"
              target="_blank"
              href="https://github.com/anirudhgray"
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
        </Grid.Col>
      </Grid> */}
    </Container>
  );
}
