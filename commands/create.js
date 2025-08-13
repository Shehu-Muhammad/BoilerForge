import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const create = new Command('create')
  .description('Creates a new project folder with boilerplate files.')
  .argument('<name>', 'name of project')
  .option('--template <type>', 'project template type (node, python, react)')
  .option('--git', 'initializes a Git repo automatically')
  .action((name, options) => {
    const projectPath = getProjectPath(name);
    const templateType = getTemplateType(options);
    const templatePath = getTemplatePath(templateType);
    try {
      fs.statSync(projectPath);
      console.log(`Project "${name}" already exists!`);
      process.exit(1);

    } catch (err) {
      console.log(`Folder doesn't exist. Safe to create project "${name}"`);
      checkForValidTemplate(templatePath);
      console.log(`Creating project "${name}" with template: ${templateType} and ${options.git}`);
    }

    try {
      fs.mkdirSync(projectPath, { recursive: true });
      console.log(`Created folder at ${projectPath}`);
    } catch (err) {
      console.log("Failed to create the folder", err.message);
      process.exit(1);
    }

    try {
      fs.cpSync(templatePath, projectPath, { recursive: true });
      console.log("Copied template files.");
    } catch (err) {
      console.log("Failed to copy the template files", err.message);
      process.exit(1);
    }
    
    if (options.git) {
      try {
        execSync('git init', { cwd: projectPath, stdio: 'inherit' });
        console.log("Initialized empty Git repository.");
      } catch (err) {
        console.error("Failed to initialize Git:", err.message);
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
