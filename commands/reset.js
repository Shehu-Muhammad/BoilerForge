import { Command } from "commander";
import inquirer from 'inquirer';
import fs from "fs";
import path from "path";

const reset = new Command('reset')
  .description('Delete all projects or a specific project inside generated/.')
  .argument('[project]', 'The project to delete (if not provided, clears everything).')
  .action(async (project) => {
    const currentWorkingDirectory = process.cwd();
    const generatedPath = path.join(currentWorkingDirectory, 'generated');
    
    if (project) {
        try {
            // Targeted reset flow
            if (fs.existsSync(generatedPath)) {
                const files = fs.readdirSync(generatedPath);
                if (files.length === 0) {
                    console.log('⚠️ The generated/ directory is empty.');
                    return
                } else {
                        const projectPath = path.join(currentWorkingDirectory, 'generated', project);

                        if (!fs.existsSync(projectPath)) {
                            console.log(`⚠️ Project '${project}' not found inside generated/`);
                            return;
                        }
 
                        const { confirm } = await inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'confirm',
                            message: `This will delete ${project}. Continue? (y/n)`,
                            default: false,
                        },
                    ]);

                    if ( confirm ) {
                            fs.rmSync(projectPath, { recursive: true, force: true })
                            console.log(`✅ Project ${project} has been deleted.`);
                        } else {
                            console.log("Reset cancelled.");
                    }
                }
            } else {
                console.log('⚠️ generated/ directory does not exist.');
                return
            }
            
        } catch(err) {
            console.log(err.message);
        }
        process.exit(0);

    } else {
        // Global reset flow
        try {
            
            fs.statSync(generatedPath);
            console.log('Generated directory exists.');

            const { confirm } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: "This will delete ALL generated projects. Continue?",
                    default: false,
                },
            ]);

            if ( confirm ) {
                const files = fs.readdirSync(generatedPath);
                files.forEach(file => {
                    fs.rmSync(path.join(generatedPath, file), { recursive: true, force: true });
                });


                //fs.rmSync(projectPath, { recursive: true, force: true })
                console.log('✅ All projects inside generated/ have been deleted.');
            } else {
                console.log("Reset cancelled.");
            }
    
        } catch (err) {
            console.log('⚠️ No generated projects found.');
        }
        process.exit(0);
    }
  })

  export default reset;


  function deleteProject() {

  }
  
  function deleteAllProjects() {

  }