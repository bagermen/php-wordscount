import argparse
import os
from helpers import dot_env_vars
import shlex
from subprocess import Popen, PIPE
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
parser = argparse.ArgumentParser(description='Deploy Stack')
parser.add_argument('-r', '--remove', action='store_true', help="remove stack")

stack = 'apachephp'

args = parser.parse_args()

def check_stack_running(stack):
    command = "docker stack ls --format '{{.Name}}'"
    out, err = Popen(shlex.split(command), stdout=PIPE, stderr=PIPE).communicate()
    stacks = out.strip().decode('utf-8').split(sep='\n')

    return not err and stacks.count(stack) > 0

if args.remove:
    command = 'docker stack rm '
    os.system(command + stack)
else:
    if (not check_stack_running(stack)):
        # deploy composer file into swarm
        os.environ.update(dot_env_vars(os.path.join(current_dir, '.env')))
        command = 'docker stack deploy --compose-file docker-compose.yml '
        os.system(command + stack)