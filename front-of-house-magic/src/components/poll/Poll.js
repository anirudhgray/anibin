import {
  Title,
  TextInput,
  Button,
  Text,
  Loader,
  Checkbox,
  Modal,
  Alert,
} from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import React, { useState } from 'react';
import { Prism } from '@mantine/prism';
import { CrossCircledIcon } from '@modulz/radix-icons';

import axios from '../../axios.js';
import { Link } from 'react-router-dom';

export default function Poll() {
  const [question, setQuestion] = useState('');
  const [questionDetails, setQuestionDetails] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [mcq, setMcq] = useState(true);
  const [theme, setTheme] = useState('purple');
  const [singleResponse, setSingleResponse] = useState(true);

  const [count, setCount] = useState(2);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [link, setLink] = useState('');

  let optionFields = [];
  for (let i = 0; i < count; i++) {
    optionFields.push(
      <div className="flex">
        <TextInput
          required={true}
          className="md:w-11 w-11"
          placeholder={`Option ${i}`}
          value={options[i]}
          onChange={(e) => {
            let tempObj = [...options];
            tempObj[i] = e.currentTarget.value;
            setOptions(tempObj);
          }}
          key={`optionField${i}`}
        ></TextInput>
        <Button
          onClick={() => {
            setCount(count - 1);
            options.splice(i, 1);
          }}
          className="md:w-1 w-2"
          color="red"
          variant="filled"
          key={`delButton${i}`}
        >
          -
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!options.length) {
    }
    const pollObj = {
      question,
      details: questionDetails,
      mcq,
      options,
      theme,
      singleResponse,
    };
    await axios
      .post('/polls', pollObj)
      .then((res) => {
        setLink(`http://localhost:3000/polls/${res.data._id}`);
        setLoading(false);
        setOpened(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-column"
        style={{ gap: '1rem' }}
      >
        <Title order={3}>Create Poll</Title>
        <TextInput
          required={true}
          value={question}
          onChange={(e) => setQuestion(e.currentTarget.value)}
          placeholder="Your question goes here."
          label="Question"
        ></TextInput>
        <label>Details</label>
        <RichTextEditor
          sticky={true}
          value={questionDetails}
          onChange={setQuestionDetails}
          controls={[
            ['bold', 'italic', 'unorderedList'],
            ['codeBlock', 'image', 'video'],
          ]}
        ></RichTextEditor>
        <Title order={4}>Options</Title>
        {count <= 0 ? (
          <Alert
            icon={<CrossCircledIcon size={16} />}
            title="Holup."
            color="red"
          >
            Can't have a poll with no options, mate.
          </Alert>
        ) : null}
        {count === 1 ? (
          <Alert
            icon={<CrossCircledIcon size={16} />}
            title="Holup, this is a democracy."
            color="red"
          >
            Can't have a poll with just one option. Right? Right??
          </Alert>
        ) : null}
        {optionFields}
        <Button
          onClick={() => {
            setCount(count + 1);
            options.push('');
          }}
          variant="filled"
          color="green"
          className="w-3 mx-auto"
        >
          +
        </Button>
        <Checkbox
          className="mx-auto"
          label="Allow Multiple Responses?"
          checked={!singleResponse}
          onChange={(e) => setSingleResponse(!e.currentTarget.checked)}
        />
        <Button
          className="mt-5 mx-auto"
          variant="filled"
          color="grape"
          type="submit"
          disabled={count <= 1}
        >
          {!loading ? (
            <Text>Create</Text>
          ) : (
            <Loader color="white" size="sm"></Loader>
          )}
        </Button>
      </form>

      <Modal
        centered={true}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Created!"
        size="lg"
        overlayOpacity={0.85}
      >
        <Prism language="markdown">{link}</Prism>
      </Modal>
    </div>
  );
}
