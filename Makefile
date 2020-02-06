PREFIX = commando

#
# Where to install the tools
#
DESTINATION_DIR = /usr/local/bin

#
# Files to install
#
FILES = \
	${PREFIX} \
	${PREFIX}-*

#
# Rules
#
install: install_deps install_tools announce_installation

announce_installation:
	@echo "OK, ${PREFIX} command line tools have been installed. 🎉  Here's what's available:\n" && ${PREFIX} --list

install_deps:
	@echo "Installing dependencies..."
	gem install commander
	gem install terminal-table
	gem install pastel
	gem install terrapin
	gem install edl
	gem install timecode
	gem install chunky_png
	-brew install ffmpeg

install_tools:
	@install -m 755 -p $(FILES) ${DESTINATION_DIR}

uninstall:
	sh -c "cd ${DESTINATION_DIR} && rm ${PREFIX} && rm ${PREFIX}-*"

reinstall: uninstall install
