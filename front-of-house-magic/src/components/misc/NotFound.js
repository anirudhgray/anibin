import { Title, Text, Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const [title, setTitle] = useState('');
  const [buttonText, setButtonText] = useState('');

  function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    setTitle(choices[index].title);
    setButtonText(choices[index].buttonText);
  }

  const [choices] = useState([
    {
      title: 'Move along, move along.',
      buttonText: 'Back out through the blast doors.',
    },
    {
      title: 'I have no memory of this place.',
      buttonText: 'Check your references in Elven lore.',
    },
    { title: "Don't blink.", buttonText: 'Step slowly back...' },
    {
      title: 'You shall not pass!',
      buttonText: "Seriously, you can't. It's an error.",
    },
    { title: 'Here be dragons.', buttonText: 'Head back to civilisation.' },
    {
      title: 'Your internet is full.',
      buttonText: "That's what Wally told me.",
    },
  ]);

  useEffect(() => {
    choose(choices);
  }, [choices]);

  return (
    <div className="flex flex-column align-items-center">
      <Title order={2}>{title}</Title>
      <Text>404.</Text>
      <Button
        component={Link}
        to="/"
        className="mt-6"
        variant="subtle"
        color="grape"
      >
        {buttonText}
      </Button>
    </div>
  );
}
