# Commando
Thinko's command line tools. Based on [magic-cli](http://github.com/slackhq/magic-cli) by Slack.

## Customization
You can add a human-readable description in that list by putting a comment immediately under the `#!` line:

````bash
#!/usr/bin/env bash
# This line will be shown in the list of commands.
````

You can also define any extra parameters that are required for the script with a `# @param` line for each parameter:

````bash
#!/usr/bin/env bash
# This line will be shown in the list of commands.
# @param <command_param> - Longer Description of the Parameter
# @param - If you don’t give a parameter name, a default one will be created for you
````

## Installation
This repository includes a Makefile that will install `commando` and all of its subcommands into `/usr/local/bin`:

````bash
make install
````

You can also use it to uninstall `commando`:

````bash
make uninstall
````

## Updates

An example script for updating the tools is also included; it makes installing the latest tools into a single step process:

```bash
commando update
Updated tools to 01ec2ef (2016-03-30 16:20:30 -0700)
```
