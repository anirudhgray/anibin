import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import PasteCard from './PasteCard.js';
import { Skeleton } from '@mantine/core';

export default function ViewPaste() {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(async () => {
    await axios
      .get(`/pastes/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          return navigate('/paste-not-found');
        } else if ((e.response.status = 401)) {
          return navigate(`/pastebins/${id}/authorise`);
        }
      });
  }, [id]);
  return (
    <div className="flex flex-column">
      {data && !loading ? (
        <PasteCard data={data}></PasteCard>
      ) : (
        <div>
          <Skeleton height={50} className="w-5 mb-3"></Skeleton>
          <Skeleton height={20} className="w-3 mb-3"></Skeleton>
          <Skeleton height={100} className="w-12 mb-3"></Skeleton>
          <div className="flex justify-content-between">
            <Skeleton height={70} circle className="mb-3"></Skeleton>
            <Skeleton height={70} className="w-10 mb-3"></Skeleton>
          </div>
        </div>
      )}
    </div>
  );
}
