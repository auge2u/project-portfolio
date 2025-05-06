# Project Portfolio

A portfolio project that uses asdf for version management.

## Setup with asdf

This project uses [asdf](https://asdf-vm.com/) for managing tool versions. asdf allows you to use specific versions of tools like Node.js per project.

### Prerequisites

Make sure you have asdf installed:

```bash
# Check if asdf is installed
which asdf
```

If not installed, follow the [official installation guide](https://asdf-vm.com/guide/getting-started.html).

### Setting up the project

1. Clone the repository and navigate to the project directory:

```bash
cd project-portfolio
```

2. Install the required plugins (if you haven't done so already):

```bash
asdf plugin add nodejs
```

3. Install the specified versions from `.tool-versions` file:

```bash
asdf install
```

This will install Node.js 23.11.0 or higher as specified in the `.tool-versions` file.

4. Install project dependencies:

```bash
npm install
```

## Development

After setting up the project, you can use the following npm scripts:

```bash
npm start   # Start the application
npm test    # Run tests
```

## Useful asdf commands

```bash
asdf current                # Show current versions
asdf list nodejs            # List installed Node.js versions
asdf list all nodejs        # List all available Node.js versions
asdf set nodejs <version>   # Set a different Node.js version
asdf install nodejs latest  # Install the latest Node.js version
```
