import { Command } from "commander";
import inquirer from 'inquirer';
import fs from "fs";
import path from "path";

const reset = new Command('reset')
  .description('Delete all projects or a specific project inside generated/.')
  .argument('[project]', 'The project to delete (if not provided, clears everything).')
  .action(async (project) => {
    const cwd = process.cwd();
    const generatedPath = path.join(cwd, 'generated');

    if (!fs.existsSync(generatedPath)) {
        console.log('⚠️ generated/ directory does not exist.');
        return;
    }

    const files = fs.readdirSync(generatedPath);
    if (files.length === 0) {
        console.log('⚠️ The generated/ directory is empty.');
        return;
    }

    if (project) {
        const projectPath = path.join(generatedPath, project);
        if (!fs.existsSync(projectPath)) {
            console.log(`⚠️ Project '${project}' not found inside generated/`);
            return;
        }
        await deleteProjects(`This will delete ${project}. Continue?`, projectPath, project, false);
    } else {
        await deleteProjects('This will delete ALL generated projects. Continue?', generatedPath, undefined, true);
    }
});

export default reset;

async function deleteProjects(message, targetPath, project = undefined, all = false) {
    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message,
            default: false,
        },
    ]);

    if (!confirm) {
        console.log("Reset cancelled.");
        return;
    }

    try {
        if (!all) {
            fs.rmSync(targetPath, { recursive: true, force: true });
            console.log(`✅ Project ${project} has been deleted.`);
        } else {
            // Remove the contents of the generated folder and leave the folder empty
            const files = fs.readdirSync(targetPath); 
            files.forEach(file => 
                { fs.rmSync(path.join(targetPath, file), { recursive: true, force: true });
            });
            console.log('✅ All projects inside generated/ have been deleted.');
        }
    } catch (err) {
        console.log(all 
            ? 'You do not have permission to delete these files.' 
            : `You do not have permission to delete ${project}.`, err.message);
    }
}
