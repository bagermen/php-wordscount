import argparse
import os
import sys
from enum import Enum
import shlex
from subprocess import Popen, PIPE
from shutil import copytree, ignore_patterns, copyfile, rmtree

# from helpers import dot_env_vars

StackType = Enum('StackType', 'dev prod')
cur_dir = os.getcwd()

current_dir = os.path.dirname(os.path.abspath(__file__))
parser = argparse.ArgumentParser(description='Run Stack')
parser.add_argument('-r', '--remove', action='store_true', help="remove stack")
parser.add_argument('stack', nargs='?',default=StackType.prod.name, choices=[StackType.dev.name, StackType.prod.name], help="Stack Type")

args = parser.parse_args()

def run_command(command, path):
    process = Popen(shlex.split(command), cwd=path, stdout=PIPE, stderr=PIPE)
    while True:
        output = process.stdout.readline()
        if process.poll() is not None:
            break
        if output:
            print(output.strip().decode('utf-8') )

    return not process.communicate()[1]

def run_docker():
    return run_command('python deploy.py', os.path.join(cur_dir, 'docker'))

def stop_docker():
    return run_command('python deploy.py -r', os.path.join(cur_dir, 'docker'))

def copy_files_to_htdocs():
    source = os.path.join(cur_dir, 'assets', 'public')
    destination = os.path.join(cur_dir, 'htdocs', 'public', 'build')

    rmtree(destination, ignore_errors=True)
    copytree(source, destination, ignore=ignore_patterns('*.twig'))
    copyfile(os.path.join(source, 'assets.macros.twig'), os.path.join(os.path.join(cur_dir, 'htdocs', 'templates'), 'assets.macros.twig'))

def get_container_ids():
    command = "docker ps --filter 'label=type=php' --format='{{.ID}}'"
    out, err = Popen(shlex.split(command), stdout=PIPE, stderr=PIPE).communicate()

    if out and not err:
        return out.strip().decode('utf-8').split(sep='\n')
    else:
        return []

def warm_up_cache():
    for containerId in get_container_ids():
        os.system("docker exec --user=www-data {container} php ./bin/console --env=prod cache:clear".replace("{container}", containerId))
        os.system("docker exec --user=www-data {container} php ./bin/console --env=prod cache:warmup".replace("{container}", containerId))

def set_up_prod():
    os.system('npm run prod')
    copy_files_to_htdocs()
    warm_up_cache()

def set_up_dev():
    os.system('npm run dev')

if (args.remove):
    stop_docker()
else:
    run_docker()

    os.chdir(os.path.join(cur_dir, 'assets'))
    if (StackType.dev == StackType[args.stack]):
        set_up_dev()
    elif (StackType.prod == StackType[args.stack]):
        set_up_prod()
    else:
        argparse.format_help()