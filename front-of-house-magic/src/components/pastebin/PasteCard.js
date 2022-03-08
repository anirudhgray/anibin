import React from 'react';
import { Card, Title, Text } from '@mantine/core';
import { Prism } from '@mantine/prism';
import RichTextEditor from '@mantine/rte';

export default function PasteCard({ data }) {
  return (
    <div className="w-12">
      <Card shadow="md">
        <Title>{data.title}</Title>
        <Text color="gray">
          Created At: {new Date(data.createdAt).toString()}
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
