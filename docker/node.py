import sys
import os
import shlex
from helpers import dot_env_vars

variables = dot_env_vars('.env')
source = os.path.abspath(shlex.quote(variables['HOST_PROJECT_DIR']))
dest = shlex.quote("/var/www/html")
command = "docker run --rm -it " + "--mount type=bind,src=" + source + ",dst=" + dest + " -w=" + dest + " node:lts-alpine "
command += ' '.join(map(str, sys.argv[1:]))
os.system(command)

