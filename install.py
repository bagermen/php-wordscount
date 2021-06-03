import os
import time
import shlex
from subprocess import Popen, PIPE
from shutil import copyfile

# from helpers import dot_env_vars
cur_dir = os.getcwd()

current_dir = os.path.dirname(os.path.abspath(__file__))


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


def get_container_ids():
    command = "docker ps --filter 'label=type=php' --format='{{.ID}}'"
    out, err = Popen(shlex.split(command), stdout=PIPE, stderr=PIPE).communicate()

    if out and not err:
        return out.strip().decode('utf-8').split(sep='\n')
    else:
        return []

copyfile(os.path.join(cur_dir, 'docker', '.env.dist'), os.path.join(cur_dir, 'docker', '.env'))

os.system('docker pull besogon1/php-fpm-dbs')

run_docker()

time.sleep(10)
for containerId in get_container_ids():
        os.system("docker exec --user=www-data {container} php ./composer.phar i".replace("{container}", containerId))

stop_docker()

os.chdir(os.path.join(cur_dir, 'assets'))
os.system('npm clean-install')

print('----------------')
print('Use run.py to start the project')