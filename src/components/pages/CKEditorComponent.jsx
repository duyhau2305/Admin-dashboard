import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CKEditorComponent({ onMessageChange, sendMessage }) {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onChange={(event, editor) => {
          const data = editor.getData();
          onMessageChange(data);
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default CKEditorComponent;
