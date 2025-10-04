// Initialize CKEditor 5 with custom configuration
document.addEventListener('DOMContentLoaded', function() {
  const editorElement = document.querySelector('#id_answer');
  if (editorElement) {
    ClassicEditor
      .create(editorElement, {
        language: 'en',
        removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'CKBox', 'EasyImage', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed'],
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
          'fontBackgroundColor', 'fontColor', 'fontSize', 'fontFamily', '|',
          'alignment', 'indent', 'outdent', '|',
          'insertTable', '|',
          'undo', 'redo'
        ],
        table: {
          contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ],
          defaultHeadings: { rows: 1, columns: 1 },
          defaultProperties: {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#000',
            width: '100%',
            tableLayout: 'fixed'
          },
          tableCell: {
            borderColors: [
              {
                color: 'black',
                label: 'Black',
                hasBorder: true
              },
              {
                color: 'transparent',
                label: 'No border',
                hasBorder: false
              }
            ]
          },
          // Ensure new tables have equal column widths
          onTableCreation: (model, writer) => {
            const table = model.document.selection.getFirstPosition().findAncestor('table');
            if (table) {
              writer.setAttribute('tableLayout', 'fixed', table);
              
              // Set equal width for all cells
              for (const row of table.getChildren()) {
                for (const cell of row.getChildren()) {
                  writer.setAttribute('width', '1%', cell);
                }
              }
            }
          }
        },
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'linkImage'
          ]
        },
        table: {
          contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        }
      })
      .catch(error => {
        console.error('Error initializing CKEditor:', error);
      });
  }
});
