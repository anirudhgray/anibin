import React, { useEffect, useState } from 'react';
import axios from '../../axios.js';

import { RichTextEditor } from '@mantine/rte';
import {
  Button,
  SegmentedControl,
  Modal,
  PasswordInput,
  Text,
  Textarea,
  TextInput,
  Title,
  Loader,
} from '@mantine/core';
import { Prism } from '@mantine/prism';
import { Checkbox } from '@mantine/core';
import { LockClosedIcon } from '@modulz/radix-icons';

export default function Pastebin() {
  const [textValue, onTextChange] = useState('');
  const [languageString, setLangString] = useState(
    '{ "lang": "rtf", "placeholder": "Type something here." }'
  );
  const [language, setLang] = useState({
    lang: 'rtf',
    placeholder: 'Type something here.',
  });
  const [opened, setOpened] = useState(false);
  const [link, createLink] = useState('');
  const [protect, setProtected] = useState(false);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const pasteObject = {
      title,
      content: textValue,
      language: language.lang,
      theme: 'purple',
      protected: protect,
      password,
    };
    console.log(pasteObject);
    await axios
      .post('/pastes', pasteObject)
      .then((res) => {
        console.log(res);
        createLink(`http://localhost:3000/pastebins/${res.data._id}`);
        setLoading(false);
        setOpened(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  function strip(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  useEffect(() => {
    onTextChange(language.placeholder);
  }, [language]);

  useEffect(() => {
    setLang(JSON.parse(languageString));
  }, [languageString]);

  return (
    <div>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        <Title order={3}>New Paste</Title>
        <SegmentedControl
          className="mt-3"
          fullWidth
          color="blue"
          value={languageString}
          onChange={setLangString}
          data={[
            {
              label: 'RTF',
              value: '{ "lang": "rtf", "placeholder": "Type something here." }',
            },
            {
              label: 'Python',
              value:
                '{ "lang": "py", "placeholder": "print(\'Hello World!\')" }',
            },
            {
              label: 'JavaScript',
              value:
                '{ "lang": "js", "placeholder": "console.log(\'Heya!\')" }',
            },
            {
              label: 'C++',
              value: `{
              "lang": "cpp",
              "placeholder": "string greet = 'Hello!';"
            }`,
            },
          ]}
        />
        <TextInput
          required={true}
          className="mt-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          label="Title"
        ></TextInput>
        {language.lang === 'rtf' ? (
          <RichTextEditor
            className="mt-3"
            sticky={true}
            value={textValue}
            onChange={onTextChange}
            controls={[
              [
                'bold',
                'italic',
                'underline',
                'strike',
                'clean',
                'h1',
                'h2',
                'unorderedList',
              ],
              ['alignLeft', 'alignCenter', 'alignRight'],
              ['codeBlock', 'image', 'video'],
            ]}
          ></RichTextEditor>
        ) : (
          <Textarea
            className="mt-3"
            value={textValue}
            autosize={true}
            minRows={3}
            autoFocus={true}
            spellCheck={false}
            onChange={(e) => onTextChange(e.currentTarget.value)}
          ></Textarea>
        )}
        {language.lang !== 'rtf' ? (
          <Prism language={language.lang}>{`\n${strip(textValue)}`}</Prism>
        ) : null}
        <div className="flex mt-3 justify-content-center align-items-center">
          <Checkbox
            icon={LockClosedIcon}
            label={!protect ? 'Password Protection' : null}
            checked={protect}
            onChange={(e) => setProtected(e.currentTarget.checked)}
          />
          {protect ? (
            <PasswordInput
              autoComplete="current=-password"
              className="ml-3 md:w-4 sm:w-6 w-8"
              placeholder="Password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          ) : null}
        </div>
        <Button
          className="mt-5 mx-auto"
          variant="gradient"
          gradient={{ from: 'grape', to: 'pink', deg: 35 }}
          type="submit"
        >
          {!loading ? (
            <Text>Proceed</Text>
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
        {protect ? (
          <Text className="text-center mt-3" color="yellow">
            <LockClosedIcon></LockClosedIcon> A password will be required to
            access this resource again.
          </Text>
        ) : null}
      </Modal>
    </div>
  );
}
