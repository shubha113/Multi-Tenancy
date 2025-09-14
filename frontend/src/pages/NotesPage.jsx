import React from 'react';
import Layout from '../components/layout/Layout';
import NotesList from '../components/notes/NotesList';

const NotesPage = () => {
  return (
    <Layout>
      <div className="container">
        <NotesList />
      </div>
    </Layout>
  );
};

export default NotesPage;