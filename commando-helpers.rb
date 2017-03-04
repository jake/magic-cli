#!/usr/bin/env ruby

require 'shellwords'

require 'commander/import'
require 'pastel'

program :name, $0.split('commando-').last
program :version, '0.0.1'
program :description, 'Commando helper methods. Not called directly.'
program :help_formatter, :compact

@pastel = Pastel.new

def padded(message)
  length = message.length + 4
  " " * length + "\n  #{message}  \n" + " " * length
end

def heading(message)
  puts @pastel.inverse(padded message.upcase)
  puts
end

def notice(message)
  puts @pastel.bright_blue(message)
end

def warning(message)
  puts @pastel.bright_yellow(message)
end

def success(message)
  puts @pastel.green(message)
end

def crash(message="Unrecoverable error")
  puts @pastel.bold.red("⚠️  #{message}")
  abort
end
