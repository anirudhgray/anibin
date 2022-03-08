import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/create/pastebin');
  });
  return null;
}
