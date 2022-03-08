import './App.css';
import './bodybg.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import { MantineProvider, ColorSchemeProvider, Text } from '@mantine/core';
import { Container } from '@mantine/core';

import Navbar from './components/layouts/Navbar';
import Poll from './components/poll/Poll';
import Pastebin from './components/pastebin/Pastebin';
import NotFound from './components/misc/NotFound';
import About from './components/misc/About';
import Landing from './components/misc/Landing';
import ViewPaste from './components/pastebin/ViewPaste';
import Auth from './components/pastebin/Auth';

function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
        }}
        withGlobalStyles
      >
        <Router>
          <div className="App">
            <div className="h-full flex flex-column">
              <div>
                <Navbar />
                <Container>
                  <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route exact path="/create/poll" element={<Poll />} />
                    <Route
                      exact
                      path="/create/pastebin"
                      element={<Pastebin />}
                    />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/" element={<Landing />} />
                    <Route
                      exact
                      path="/pastebins/:id"
                      element={<ViewPaste />}
                    />
                    <Route
                      exact
                      path="/pastebins/:id/authorise"
                      element={<Auth />}
                    />
                  </Routes>
                </Container>
              </div>
              <Text
                component="a"
                target="_blank"
                href="https://github.com/anirudhgray"
                className="mt-auto mx-auto pb-3 pt-6"
              >
                Made by Anirudh Mishra.
              </Text>
            </div>
          </div>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
