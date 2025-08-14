import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { initGitRepoHelper } from './helpers/initGitRepoHelper.js';

const create = new Command('create')
  .description('Creates a new project folder with boilerplate files.')
  .argument('<name>', 'name of project')
  .option('--template <type>', 'project template type (node, python, react)')
  .option('--git [mode]', 'Initialize a Git repo automatically with (optional mode: bare, shared, etc.)')
  .action((name, options) => {
    const projectPath = getProjectPath(name);
    const templateType = getTemplateType(options);
    const templatePath = getTemplatePath(templateType);

    // Check if project folder exists
    try {
      fs.statSync(projectPath);
      console.log(`Project "${name}" already exists!`);
      process.exit(1);

    } catch (err) {
      console.log(`Folder doesn't exist. Safe to create project "${name}"`);
      checkForValidTemplate(templatePath);
      console.log(`Creating project "${name}" with template: ${templateType} and ${options.git}`);
    }

    // Create folder
    try {
      fs.mkdirSync(projectPath, { recursive: true });
      console.log(`Created folder at ${projectPath}`);
    } catch (err) {
      console.log("Failed to create the folder", err.message);
      process.exit(1);
    }

    // Copy template files
    try {
      fs.cpSync(templatePath, projectPath, { recursive: true });
      console.log("Copied template files.");
    } catch (err) {
      console.log("Failed to copy the template files", err.message);
      process.exit(1);
    }
    
    // Initialize Git if requested
    if (options.git !== undefined) {
      const gitOptions = {};
      if (options.git === 'bare') gitOptions.bare = true;

      try {
        initGitRepoHelper(projectPath, gitOptions);
      } catch (err) {
        console.error("❌ Git initialization failed:", err.message);
      }
    }

    console.log(`Project "${name}" created successfully with template "${templateType}".`);

  })

export default create;

function getProjectPath(name) {
  const currentWorkingDirectory = process.cwd();
  const projectPath = path.join(currentWorkingDirectory, 'generated', name);
  return projectPath;
}

function checkForValidTemplate(templatePath) {
  // Checks if template exists in template folder
  if (!fs.existsSync(templatePath) || !fs.statSync(templatePath).isDirectory()) {
    console.log("Invalid template type");
    process.exit(1);
  }
}

function getTemplatePath(templateType) {
  const templatePath = path.join(process.cwd(), 'templates', templateType)
  return templatePath;
}

function getTemplateType(options) {
  let templateType = options.template;
  if (!templateType) {
    templateType = "node"; // default template
  }
  return templateType;
}
