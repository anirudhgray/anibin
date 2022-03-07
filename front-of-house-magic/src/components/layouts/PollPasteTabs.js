import React from 'react';
import { Button } from '@mantine/core';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PollPasteTabs() {
  const [selectedTab, setSelectedTab] = useState('poll');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/create/poll') {
      setSelectedTab('poll');
    } else if (location.pathname === '/create/pastebin') {
      setSelectedTab('pastebin');
    } else if (location.pathname === '/about') {
      setSelectedTab('about');
    } else {
      setSelectedTab(null);
    }
  }, [location]);
  return (
    <div className="mx-auto w-min flex" style={{ gap: '0.5rem' }}>
      <Button
        color="teal"
        variant={selectedTab === 'about' ? 'filled' : 'light'}
        component={Link}
        to="/about"
      >
        Wut This?
      </Button>
      <Button
        color="teal"
        variant={selectedTab === 'poll' ? 'filled' : 'light'}
        component={Link}
        to="/create/poll"
      >
        Poll
      </Button>
      <Button
        color="teal"
        variant={selectedTab === 'pastebin' ? 'filled' : 'light'}
        component={Link}
        to="/create/pastebin"
      >
        Pastebin
      </Button>
    </div>
  );
}
