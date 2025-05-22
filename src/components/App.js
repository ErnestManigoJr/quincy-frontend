import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [response, setResponse] = useState('');
  const [renderFile, setRenderFile] = useState('');
  const [renderResult, setRenderResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setResponse(data.message || 'Upload complete');
    } catch (err) {
      console.error(err);
      setResponse('Upload failed');
    }
  };

  const handleLyricsSubmit = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/lyrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: lyrics })
      });
      const data = await res.json();
      setResponse(data.rewritten || 'Lyrics processed');
    } catch (err) {
      console.error(err);
      setResponse('Lyric processing failed');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Quincy: Upload + Rewrite</h1>

      <h3>1. Upload MP3</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h3>2. Rewrite Lyrics</h3>
      <textarea rows="5" cols="50" value={lyrics} onChange={(e) => setLyrics(e.target.value)} />
      <br />
      <button onClick={handleLyricsSubmit}>Submit Lyrics</button>

      <h3>Response:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
