# Mahesh Sathiamoorthy's Website

Homepage/blog of Mahesh Sathiamoorthy.

## Building and Testing the Website

This is a Jekyll-based website. Here are the steps to build and test it locally:

### Prerequisites

- Docker and Docker Compose installed on your system
- Git (to clone the repository)

### Building the Website

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd madiator.github.com
   ```

2. **Build the Jekyll site using Docker**:
   ```bash
   docker compose run --rm jekyll bundle exec jekyll build
   ```
   
   This will generate the static site files in the `_site` directory.

### Testing on Localhost

1. **Start the Jekyll development server**:
   ```bash
   docker compose up
   ```
   
   This will start the Jekyll server with auto-regeneration enabled.

2. **Access the website**:
   Open your browser and navigate to `http://localhost:4000`

3. **Stop the server**:
   Press `Ctrl+C` in the terminal to stop the development server.

### Alternative: Using Local Ruby Environment

If you prefer to use a local Ruby environment instead of Docker:

1. **Install dependencies**:
   ```bash
   bundle install
   ```

2. **Build the site**:
   ```bash
   bundle exec jekyll build
   ```

3. **Serve locally**:
   ```bash
   bundle exec jekyll serve
   ```

   Then visit `http://localhost:4000` in your browser.

### Troubleshooting

#### RubyGems Version Warning

If you encounter a warning like:
```
Your RubyGems version (3.0.3.1) has a bug that prevents `required_ruby_version` from working for Bundler...
```

This typically happens with older Ruby versions (like Ruby 2.6.x). Here are your options:

1. **Recommended: Use Docker** (avoids all Ruby version issues):
   ```bash
   docker compose run --rm jekyll bundle exec jekyll build
   docker compose up
   ```

2. **Update Ruby** (if you want to use local Ruby):
   - Install a newer Ruby version using a version manager like `rbenv` or `rvm`
   - Ruby 3.0+ is recommended for better compatibility

3. **Ignore the warning** (if everything still works):
   - The warning is just about future compatibility
   - Your current setup may still work for now

#### Gem Version Conflicts

If you get an error like:
```
You have already activated i18n 1.12.0, but your Gemfile requires i18n 0.9.5. Prepending `bundle exec` to your command may solve this.
```

**Solution**: Always use `bundle exec` with Docker commands:
```bash
docker compose run --rm jekyll bundle exec jekyll build
```

#### Other Common Issues

- **Permission errors**: Use `sudo` for gem installations if needed
- **Bundle install fails**: Try `bundle update` or use Docker instead
- **Port 4000 already in use**: Change the port with `jekyll serve --port 4001`

### Notes

- The Docker approach is **strongly recommended** as it avoids Ruby version conflicts and dependency issues
- The site uses Jekyll 4.3.2 with various plugins for feed generation and other features
- All site files are generated in the `_site` directory when building
- The development server automatically regenerates the site when files are changed