tinymce.PluginManager.add('upload', function(editor, url) {
  // Add a button that opens a window
  editor.addButton('upload', {
    text: 'Upload File',
    icon: false,
    onclick: function() {
      filepicker.pick(
      {
        container: 'window',
        services: ['COMPUTER']
      },
      function(Blob){
        // TODO: send request to the uploads endpoint
        var ext = Blob.filename.split('.')[1];
        if (ext === 'pdf')
          editor.insertContent('PDF: ' + Blob.url);
        else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png')
          editor.insertContent('<img src="' + Blob.url + '"/>');
        else if (ext === 'mp4')
          editor.insertContent('<video width="320" height="240" src="' + Blob.url + '"></video>');
        else
          editor.insertContent('<a href="' + Blob.url + '"/>' + Blob.filename + '</a>');
      },
      function(FPError){
    //  console.log(FPError.toString()); - print errors to console
      });
    }
  });
});
