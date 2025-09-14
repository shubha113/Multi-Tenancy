import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../store/notesSlice';
import Layout from '../components/layout/Layout';
import Loading from '../components/ui/Loading';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notes, totalNotes, isLoading } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const recentNotes = notes.slice(0, 3);

  return (
    <Layout>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Dashboard</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div className="card">
              <h3 className="font-bold" style={{ marginBottom: '8px' }}>Total Notes</h3>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>
                {totalNotes}
              </p>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                {user?.role === 'admin' ? 'Can manage subscription' : 'Can manage notes'}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Notes</h3>
            </div>

            {isLoading ? (
              <Loading message="Loading recent notes..." />
            ) : recentNotes.length > 0 ? (
              <div>
                {recentNotes.map((note) => (
                  <div
                    key={note._id}
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #e2e8f0',
                      marginBottom: '12px'
                    }}
                  >
                    <h4 className="font-medium" style={{ marginBottom: '4px' }}>
                      {note.title}
                    </h4>
                    <p className="text-sm" style={{ color: '#6b7280', marginBottom: '4px' }}>
                      {note.content.substring(0, 100)}
                      {note.content.length > 100 ? '...' : ''}
                    </p>
                    <p className="text-xs" style={{ color: '#9ca3af' }}>
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                <div className="text-center" style={{ marginTop: '16px' }}>
                  <Link
                    to="/notes"
                    style={{
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    View all notes →
                  </Link>
                </div>
              </div>
            ) : (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                No notes yet. 
                <Link to="/notes" style={{ color: '#3b82f6' }}>
                  Create your first note
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;