import React from 'react';
import app from './app';

global.React = React;

app.set('port', process.env.PORT || 3001)
  .listen(
    app.get('port'),
    () => console.log(`Color Organizer running at 'http://localhost:${app.get('port')}'`),
  );
