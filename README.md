# Django + Tailwind CSS Boilerplate

A modern Django project template with Tailwind CSS integration.

## Features
- Django 5.2.4
- Tailwind CSS 4.2.0
- Auto-reload for development
- Pre-configured development tools

## Tailwind Plugins
- Tailwind Motion
- DaisyUI

## Setup
1. Clone the repository
2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   cd theme/static_src && npm install
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start development servers:
   ```bash
   # Terminal 1
   python manage.py tailwind start
   # Terminal 2
   python manage.py runserver
   ```
6. Visit `http://127.0.0.1:8000/`

## Project Structure
- `core/` - Main Django app
- `project/` - Project settings
- `static/` - Static files
- `templates/` - HTML templates
- `theme/` - Tailwind CSS files

## Development
- Run Django + Tailwind at the same time:
  ```bash
  python manage.py tailwind dev
  ```
- Run tests:
  ```bash
  python manage.py test
  ```
