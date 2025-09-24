customColorPalette = [
    {
        'color': 'hsl(4, 90%, 58%)',
        'label': 'Red'
    },
    {
        'color': 'hsl(340, 82%, 52%)',
        'label': 'Pink'
    },
    {
        'color': 'hsl(291, 64%, 42%)',
        'label': 'Purple'
    },
    {
        'color': 'hsl(262, 52%, 47%)',
        'label': 'Deep Purple'
    },
    {
        'color': 'hsl(231, 48%, 48%)',
        'label': 'Indigo'
    },
    {
        'color': 'hsl(207, 90%, 54%)',
        'label': 'Blue'
    },
]

CKEDITOR_5_CUSTOM_CSS = 'path_to.css'  # optional
CKEDITOR_5_FILE_STORAGE = "path_to_storage.CustomStorage"  # optional
CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': {
            'items': [
                'heading',
                '|',
                'alignment',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'subscript',
                'superscript',
                '|',
                'fontFamily',
                'fontSize',
                'fontColor',
                'fontBackgroundColor',
                'highlight',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                '|',
                'indent',
                'outdent',
                '|',
                'link',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                '|',
                'imageUpload',
                'imageInsert',
                '|',
                'horizontalLine',
                'pageBreak',
                '|',
                'undo',
                'redo',
                '|',
                'code',
                'codeBlock',
                'htmlEmbed',
                '|',
                'sourceEditing',
                'restrictedEditingException',
                '|',
                'findAndReplace',
                'selectAll',
                '|',
                'removeFormat'
            ],
            'shouldNotGroupWhenFull': True
        },
        'image': {
            'toolbar': [
                'imageTextAlternative',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                'linkImage',
                'toggleImageCaption',
                'imageResize:50',
                'imageResize:75',
                'imageResize:100',
                'imageResize:original',
                '|',
                'imageResize',
                '|',
                'imageStyle:alignLeft',
                'imageStyle:alignCenter',
                'imageStyle:alignRight'
            ]
        },
        'table': {
            'contentToolbar': [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        'heading': {
            'options': [
                { 'model': 'paragraph', 'title': 'Paragraph', 'class': 'ck-heading_paragraph' },
                { 'model': 'heading1', 'view': 'h1', 'title': 'Heading 1', 'class': 'ck-heading_heading1' },
                { 'model': 'heading2', 'view': 'h2', 'title': 'Heading 2', 'class': 'ck-heading_heading2' },
                { 'model': 'heading3', 'view': 'h3', 'title': 'Heading 3', 'class': 'ck-heading_heading3' },
                { 'model': 'heading4', 'view': 'h4', 'title': 'Heading 4', 'class': 'ck-heading_heading4' },
                { 'model': 'heading5', 'view': 'h5', 'title': 'Heading 5', 'class': 'ck-heading_heading5' },
                { 'model': 'heading6', 'view': 'h6', 'title': 'Heading 6', 'class': 'ck-heading_heading6' }
            ]
        },
        'fontFamily': {
            'options': [
                'default',
                'Arial, Helvetica, sans-serif',
                'Courier New, Courier, monospace',
                'Georgia, serif',
                'Lucida Sans Unicode, Lucida Grande, sans-serif',
                'Tahoma, Geneva, sans-serif',
                'Times New Roman, Times, serif',
                'Trebuchet MS, Helvetica, sans-serif',
                'Verdana, Geneva, sans-serif'
            ]
        },
        'fontSize': {
            'options': [
                'tiny',
                'small',
                'default',
                'big',
                'huge'
            ]
        },
        'htmlSupport': {
            'allow': [
                {
                    'name': '/*',
                    'attributes': "true",
                    'classes': "true",
                    'styles': "true"
                }
            ]
        },
        'mediaEmbed': {
            'previewsInData': True
        },
        'link': {
            'decorators': {
                'openInNewTab': {
                    'mode': 'manual',
                    'label': 'Open in a new tab',
                    'defaultValue': True,
                    'attributes': {
                        'target': '_blank',
                        'rel': 'noopener noreferrer'
                    }
                }
            }
        },
        'codeBlock': {
            'languages': [
                { 'language': 'plaintext', 'label': 'Plain text' },
                { 'language': 'html', 'label': 'HTML' },
                { 'language': 'css', 'label': 'CSS' },
                { 'language': 'javascript', 'label': 'JavaScript' },
                { 'language': 'python', 'label': 'Python' },
                { 'language': 'java', 'label': 'Java' },
                { 'language': 'c', 'label': 'C' },
                { 'language': 'cpp', 'label': 'C++' },
                { 'language': 'csharp', 'label': 'C#' },
                { 'language': 'php', 'label': 'PHP' },
                { 'language': 'ruby', 'label': 'Ruby' },
                { 'language': 'go', 'label': 'Go' },
                { 'language': 'sql', 'label': 'SQL' },
                { 'language': 'json', 'label': 'JSON' },
                { 'language': 'xml', 'label': 'XML' },
                { 'language': 'bash', 'label': 'Bash' },
                { 'language': 'docker', 'label': 'Docker' },
                { 'language': 'yaml', 'label': 'YAML' },
                { 'language': 'markdown', 'label': 'Markdown' }
            ]
        }
    },
    # 'kakande_config': {
    #     "external_plugin_resources": [
    #         {
    #             "src": "/static/ckeditor5/ckeditor5.js",
    #             "id": "my_custom_editor",
    #             "tag": "script",
    #             "type": "text/javascript",
    #         },
    #     ],
    # },
    
    'extends': {
        'blockToolbar': [
            'paragraph',
            'heading1',
            'heading2',
            'heading3',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
        ],
        'toolbar': {
            'items': [
                'heading',
                '|',
                'outdent',
                'indent',
                '|',
                'bold',
                'italic',
                'link',
                'underline',
                'strikethrough',
                'code',
                'subscript',
                'superscript',
                'highlight',
                '|',
                'codeBlock',
                'sourceEditing',
                'insertImage',
                'bulletedList',
                'numberedList',
                'todoList',
                '|',
                'blockQuote',
                'imageUpload',
                '|',
                'fontSize',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                'mediaEmbed',
                'removeFormat',
                'insertTable',
            ],
            'shouldNotGroupWhenFull': 'true'
        },
        'image': {
            'toolbar': [
                'imageTextAlternative',
                '|',
                'imageStyle:alignLeft',
                'imageStyle:alignRight',
                'imageStyle:alignCenter',
                'imageStyle:side',
                '|',
            ],
            'styles': [
                'full',
                'side',
                'alignLeft',
                'alignRight',
                'alignCenter',
            ]
        },
        'table': {
            'contentToolbar': [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableProperties',
                'tableCellProperties',
            ],
            'tableProperties': {
                'borderColors': customColorPalette,
                'backgroundColors': customColorPalette
            },
            'tableCellProperties': {
                'borderColors': customColorPalette,
                'backgroundColors': customColorPalette
            }
        },
        'heading': {
            'options': [
                {
                    'model': 'paragraph',
                    'title': 'Paragraph',
                    'class': 'ck-heading_paragraph'
                },
                {
                    'model': 'heading1',
                    'view': 'h1',
                    'title': 'Heading 1',
                    'class': 'ck-heading_heading1'
                },
                {
                    'model': 'heading2',
                    'view': 'h2',
                    'title': 'Heading 2',
                    'class': 'ck-heading_heading2'
                },
                {
                    'model': 'heading3',
                    'view': 'h3',
                    'title': 'Heading 3',
                    'class': 'ck-heading_heading3'
                }
            ]
        }
    },
    'list': {
        'properties': {
            'styles': 'true',
            'startIndex': 'true',
            'reversed': 'true',
        }
    }
}

# Define a constant in settings.py to specify file upload permissions
CKEDITOR_5_FILE_UPLOAD_PERMISSION = "staff"  # Possible values: "staff", "authenticated", "any"