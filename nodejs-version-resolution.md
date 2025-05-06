# Resolving Node.js Version Compatibility Issues

This guide will help you switch to the required Node.js version (v20.19.1) using asdf and address compatibility issues with tailwindcss and daisyUI.

## Step 1: Verify Current Node.js Version

First, let's check which version of Node.js is currently active:

```bash
node -v
# Currently showing v23.11.0
```

## Step 2: Switch to the Required Node.js Version

Use asdf to switch to the required version specified in your `.tool-versions` file:

```bash
# Execute this in your project directory
asdf install
asdf current
```

This will install Node.js v20.19.1 (if not already installed) and activate it for this project.

If you see a message that the version is already installed, you're good to proceed.

## Step 3: Reset the npm Cache

It's a good practice to clear npm's cache when switching Node.js versions:

```bash
npm cache clean --force
```

## Step 4: Reinstall Packages with the Correct Node.js Version

Remove the existing node_modules directory and reinstall all packages:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

This ensures all dependencies are installed with the correct Node.js version context.

## Step 5: Verify the Installation

Check that you're now using the correct Node.js version and that the packages are installed correctly:

```bash
node -v
# Should show v20.19.1

npm list daisyui tailwindcss
# Should show the installed versions without compatibility warnings
```

## Maintaining Version Consistency

To ensure you always use the correct Node.js version when working on this project:

1. **Always work from the project directory** - asdf applies version settings based on the `.tool-versions` file in the current directory.

2. **Verify the active version before work** - Run `asdf current` to confirm you're using Node.js v20.19.1.

3. **Use direnv (optional)** - Consider installing [direnv](https://direnv.net/) to automatically switch to the correct version when entering the project directory.

4. **Create an npm script** - Add a version check to your `package.json` scripts:

```json
"scripts": {
  "prestart": "node -e \"if(process.version.slice(1) !== process.env.npm_package_engines_node) { console.error('\\nRequired Node.js version', process.env.npm_package_engines_node, 'but using', process.version.slice(1), '\\n'); process.exit(1); }\"",
  "start": "node index.js"
}
```

## Troubleshooting

If you continue to experience issues:

1. **Global vs. Local Installation** - Ensure you don't have conflicting global packages.

2. **PATH precedence** - Check that asdf-managed Node.js comes before any system Node.js in your PATH:

   ```bash
   which node
   # Should point to ~/.asdf/shims/node
   ```

3. **Shell Configuration** - Verify asdf is properly initialized in your shell configuration file (.bashrc, .zshrc, etc.).
