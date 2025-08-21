# Boilerforge
[![npm version](https://img.shields.io/npm/v/boilerforge)](https://www.npmjs.com/package/boilerforge)
[![npm downloads](https://img.shields.io/npm/dt/boilerforge)](https://www.npmjs.com/package/boilerforge)
[![Dependencies](https://img.shields.io/librariesio/release/npm/boilerforge)](https://www.npmjs.com/package/boilerforge)

A simple CLI tool for generating starter templates for Node, React, Python, and Flask projects.
> ⚡ Generate full-stack starter projects in seconds.

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Templates Available](#templates-available)
- [Git Integration](#git-integration)
- [Command Reference](#command-reference)
- [Upgrade Command - Detailed Usage](#upgrade-command-detailed-usage)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)


## About the Project

BoilerForge is a command-line application built with JavaScript that allows developers to quickly scaffold new projects. Whether you’re building with Node.js, React, Python, or Flask, BoilerForge saves you time by setting up a working starter template in seconds.

Why it exists: Setting up projects from scratch is repetitive and error-prone. BoilerForge automates this, giving you a consistent and ready-to-code starting point.

Who it’s for: Developers, teams, and students who want to save time on project setup.

---

## Features

- 📦 Create new projects instantly from built-in templates.

- 🛠 Supports Node.js, React, Python, and Flask out of the box.

- 🔄 Automatic .gitignore and license file generation.

- 🧩 Git repository initialization with multiple modes (bare, template, shared).

- 🚀 Simple CLI syntax for rapid setup.

---

## Installation

### Prerequisites

- Node.js v14+

- npm (comes with Node.js)

### Install Globally

```bash
npm install -g boilerforge
```

### Quick Start

```bash
npm install -g boilerforge
boilerforge create my-app react --git bare
cd my-app
npm install
npm start
```

---

## Usage

### Basic Syntax

```bash
boilerforge create <project-name> --template <template-name> [options]
```

### Example

```bash
boilerforge create my-app --template react --git bare
```

> For all available commands and options, see [Command Reference](#command-reference).

---

## Templates Available

| Template | Description                                    | Tech Stack      |
| -------- | ---------------------------------------------- | --------------- |
| Node.js  | Minimal setup with package.json and entry file | Node.js, npm    |
| React    | Vite-based starter                             | React, Vite     |
| Python   | Lightweight starter script                     | Python 3        |
| Flask    | Basic Flask app structure                      | Python 3, Flask |

---

## Git Integration

BoilerForge can initialize a Git repository when creating your project:

- bare – Creates a bare repo without a working directory.

- template – Uses a directory as a repo template.

- shared – Allows multiple users to push to the same repo.

---

## Command Reference

| Command       | Description                                               |
| ------------- | --------------------------------------------------------- |
| `create`      | Create a new project from a template.                     |
| `list`        | View all available templates.                             |
| `upgrade`     | Update templates from local repo or GitHub                |
| `initGitRepo` | Initialize a Git repository manually in a project folder. |
| `reset`       | Deletes one or all folders inside generated folder.       |

---

## Upgrade Command – Detailed Usage

BoilerForge allows you to keep your templates up-to-date with the upgrade command. This ensures that any new improvements, bug fixes, or template updates are applied to your generated folder.

```bash
boilerforge upgrade
```

How It Works

1. Local First:

   - If you have a local templates/ folder in your project, BoilerForge will copy all templates from there into the generated/ folder.

   - This is useful if you are developing or modifying templates locally.

2. GitHub Fallback:

   - If no local templates are found, BoilerForge will fetch templates directly from the [GitHub repository](https://github.com/shehu-muhammad/BoilerForge).

   - This ensures your generated/ folder always has the latest templates even if you don’t maintain a local copy.

3. Safety:

   - Existing projects in the generated/ folder are cleared before updating; this does not affect your actual project directories.

   - You will see console messages for every step, including success or any errors.

> Tip: Run `boilerforge upgrade` regularly to ensure you have the latest templates and fixes.

---

## Examples

Create a Node.js project with Git:
```bash
boilerforge create api-server --template node --git
```

Create a Flask project without Git:
```bash
boilerforge create my-flask-app --template flask --no-git
```

Create a bare Git repo from a template:
```bash
boilerforge create infra-setup --template node --git bare
```

Deletes a specific project in generated folder:
```bash
boilerforge reset test-node-1
```

Deletes all projects in generated folder:
```bash
boilerforge reset
```

Update templates in the generated folder from local repo or GitHub:
```bash
boilerforge upgrade
```

---

## Contributing

Pull requests are welcome! If you’d like to suggest a new template, please open an issue describing the structure and use case.

---

## License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)