import React from 'react';
import { Card, Title, Text } from '@mantine/core';
import { Prism } from '@mantine/prism';
import RichTextEditor from '@mantine/rte';
import dayjs from 'dayjs';

export default function PasteCard({ data }) {
  const getDate = (dateString) => {
    let d = new Date(dateString);
    let day = dayjs(d);
    return day.format('HH:mm on DD/MM/YYYY');
  };

  return (
    <div className="w-12">
      <Title className="mb-3" order={3}>
        Paste
      </Title>
      <Card shadow="md">
        <Title>{data.title}</Title>
        <Text color="gray">
          Created at <strong>{getDate(data.createdAt)}</strong>
        </Text>
        {data.language === 'rtf' ? (
          <RichTextEditor
            readOnly={true}
            className="mt-3"
            value={data.content}
          ></RichTextEditor>
        ) : (
          <Prism className="mt-3" language={data.language}>
            {data.content}
          </Prism>
        )}
      </Card>
    </div>
  );
}
