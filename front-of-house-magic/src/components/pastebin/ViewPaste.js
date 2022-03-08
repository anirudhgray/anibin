import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import PasteCard from './PasteCard.js';

export default function ViewPaste() {
  const { id } = useParams();
  const [data, setData] = useState(false);

  const navigate = useNavigate();

  useEffect(async () => {
    await axios
      .get(`/pastes/${id}`)
      .then((res) => {
        setData(res.data);
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
    <div className="flex justify-content-center">
      {data ? <PasteCard data={data}></PasteCard> : null}
    </div>
  );
}
